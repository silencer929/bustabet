import { db } from '../db';
import { OddsApiService } from './oddsApi.service';

export class OddsSyncService {
  // Syncs and caches active game fixtures and odds for a specific sport key
  static async syncSportOdds(sportKey: string): Promise<void> {
    const rawOdds = await OddsApiService.getOdds(sportKey);

    for (const match of rawOdds) {
      const commenceTime = new Date(match.commence_time);
      const isLive = new Date() >= commenceTime;

      await db.$transaction(async (tx) => {
        // Create or update the fixture detail
        const game = await tx.adminGame.upsert({
          where: { id: match.id },
          update: {
            status: isLive ? 'LIVE' : 'UPCOMING',
            startTime: commenceTime
          },
          create: {
            id: match.id,
            sport: match.sport_key,
            league: match.sport_title,
            homeTeam: match.home_team,
            awayTeam: match.away_team,
            startTime: commenceTime,
            status: 'UPCOMING'
          }
        });

        // Skip parsing markets if no bookmakers are returned
        if (!match.bookmakers || match.bookmakers.length === 0) return;

        // Select the first bookmaker as the primary odds provider
        const primaryBookmaker = match.bookmakers[0];

        // Deactivate all old cached markets for this game before writing updated ones
        await tx.adminGameMarket.updateMany({
          where: { gameId: game.id },
          data: { active: false }
        });

        for (const market of primaryBookmaker.markets) {
          for (const outcome of market.outcomes) {
            // Uniquely identify the option based on game, market type, and selection name
            const existingSelection = await tx.adminGameMarket.findFirst({
              where: {
                gameId: game.id,
                marketName: market.key,
                selection: outcome.name
              }
            });

            if (existingSelection) {
              await tx.adminGameMarket.update({
                where: { id: existingSelection.id },
                data: {
                  odds: outcome.price,
                  active: true
                }
              });
            } else {
              await tx.adminGameMarket.create({
                data: {
                  gameId: game.id,
                  marketName: market.key,
                  selection: outcome.name,
                  odds: outcome.price,
                  active: true
                }
              });
            }
          }
        }
      });
    }
  }
}