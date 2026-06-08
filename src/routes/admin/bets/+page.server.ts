import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  // Double-verify admin roles before loading wager tables
  if (!locals.user || locals.user.user.role !== 'ADMIN') {
    throw redirect(303, '/sportsbook');
  }

  const betsRaw = await db.bet.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      profile: { select: { username: true } },
      game: true,
      market: true
    }
  });

  // Convert custom decimal properties to serializable numbers
  const serializedBets = betsRaw.map((bet) => ({
    ...bet,
    stake: Number(bet.stake),
    odds: Number(bet.odds),
    potentialWin: Number(bet.potentialWin)
  }));

  return {
    bets: serializedBets
  };
};

export const actions: Actions = {
  // Manually settles a pending bet as WON and processes the payout
  settleWon: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    try {
      return await db.$transaction(async (tx) => {
        const bet = await tx.bet.findUnique({
          where: { id },
          include: { game: true }
        });

        if (!bet || bet.status !== 'PENDING') {
          return fail(400, { error: 'Wager is not pending or does not exist' });
        }

        await tx.bet.update({
          where: { id },
          data: { status: 'WON' }
        });

        // Log a completed payout ledger entry to credit the player
        await tx.transaction.create({
          data: {
            profileId: bet.profileId,
            type: 'PAYOUT',
            amount: bet.potentialWin,
            currency: 'USD',
            status: 'COMPLETED',
            reference: `MAN-PAY-${bet.id}`
          }
        });

        await tx.notification.create({
          data: {
            profileId: bet.profileId,
            title: 'Bet Manually Settle: Won',
            message: `Your wager on ${bet.game.homeTeam} vs ${bet.game.awayTeam} was resolved as won. Payout processed.`,
            read: false
          }
        });

        return { success: true };
      });
    } catch {
      return fail(500, { error: 'Failed to settle wager as won' });
    }
  },

  // Manually settles a pending bet as LOST
  settleLost: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    try {
      const bet = await db.bet.update({
        where: { id },
        data: { status: 'LOST' },
        include: { game: true }
      });

      await db.notification.create({
        data: {
          profileId: bet.profileId,
          title: 'Bet Manually Settle: Lost',
          message: `Your wager on ${bet.game.homeTeam} vs ${bet.game.awayTeam} was resolved as lost.`,
          read: false
        }
      });

      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to settle wager as lost' });
    }
  },

  // Voids a bet and returns the initial stake back to the user's wallet
  voidBet: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    try {
      return await db.$transaction(async (tx) => {
        const bet = await tx.bet.findUnique({
          where: { id },
          include: { game: true }
        });

        if (!bet || bet.status !== 'PENDING') {
          return fail(400, { error: 'Wager is not pending or does not exist' });
        }

        await tx.bet.update({
          where: { id },
          data: { status: 'VOIDED' }
        });

        // Refund the initial stake by creating a deposit transaction
        await tx.transaction.create({
          data: {
            profileId: bet.profileId,
            type: 'DEPOSIT',
            amount: bet.stake,
            currency: 'USD',
            status: 'COMPLETED',
            reference: `VOID-REF-${bet.id}`
          }
        });

        await tx.notification.create({
          data: {
            profileId: bet.profileId,
            title: 'Bet Voided & Refunded',
            message: `Your wager on ${bet.game.homeTeam} vs ${bet.game.awayTeam} was voided. Your stake of ${Number(bet.stake)} has been refunded.`,
            read: false
          }
        });

        return { success: true };
      });
    } catch {
      return fail(500, { error: 'Failed to void wager' });
    }
  }
};