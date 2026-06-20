import { decimalToAmerican } from '$lib/utils/odds';

export class OddsEngineService {
  private static readonly VIG_MARGIN = 1.07; // Standard 7% bookmaker margin applied to synthesized odds

  // Factorial calculator helper for Poisson distribution
  private static factorial(n: number): number {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }

  // Pure Poisson probability mass calculator
  private static poissonProbability(lambda: number, k: number): number {
    return (Math.exp(-lambda) * Math.pow(lambda, k)) / this.factorial(k);
  }

  // Synthesizes descriptive Double Chance odds using actual team names
  static synthesizeDoubleChance(homeOdds: number, drawOdds: number, awayOdds: number, homeTeam: string, awayTeam: string) {
    const pH = 1 / homeOdds;
    const pD = 1 / drawOdds;
    const pA = 1 / awayOdds;
    const sum = pH + pD + pA;

    const nH = pH / sum;
    const nD = pD / sum;
    const nA = pA / sum;

    return [
      { selection: `${homeTeam} or Draw`, odds: Number((1 / ((nH + nD) * this.VIG_MARGIN)).toFixed(2)) },
      { selection: `Draw or ${awayTeam}`, odds: Number((1 / ((nD + nA) * this.VIG_MARGIN)).toFixed(2)) },
      { selection: `${homeTeam} or ${awayTeam}`, odds: Number((1 / ((nH + nA) * this.VIG_MARGIN)).toFixed(2)) }
    ];
  }

  // Synthesizes descriptive Draw No Bet (DNB) odds using actual team names
  static synthesizeDrawNoBet(homeOdds: number, drawOdds: number, awayOdds: number, homeTeam: string, awayTeam: string) {
    const pH = 1 / homeOdds;
    const pD = 1 / drawOdds;
    const pA = 1 / awayOdds;
    const sum = pH + pD + pA;

    const nH = pH / sum;
    const nD = pD / sum;
    const nA = pA / sum;

    const pHomeNoDraw = nH / (1 - nD);
    const pAwayNoDraw = nA / (1 - nD);

    return [
      { selection: `${homeTeam} (Draw No Bet)`, odds: Number((1 / (pHomeNoDraw * this.VIG_MARGIN)).toFixed(2)) },
      { selection: `${awayTeam} (Draw No Bet)`, odds: Number((1 / (pAwayNoDraw * this.VIG_MARGIN)).toFixed(2)) }
    ];
  }

  // Synthesizes Both Teams to Score (BTTS) odds
  static synthesizeBothTeamsToScore(over25Odds: number) {
    const pOver = 1 / over25Odds;
    const pYes = Math.max(0.15, Math.min(0.85, pOver * 0.82));
    const pNo = 1 - pYes;

    return [
      { selection: 'Yes (BTTS)', odds: Number((1 / (pYes * this.VIG_MARGIN)).toFixed(2)) },
      { selection: 'No (BTTS)', odds: Number((1 / (pNo * this.VIG_MARGIN)).toFixed(2)) }
    ];
  }

  // Synthesizes 26 different Correct Score odds
  static synthesizeCorrectScores(homeOdds: number, drawOdds: number, awayOdds: number, over25Odds: number) {
    const pH = 1 / homeOdds;
    const pD = 1 / drawOdds;
    const pA = 1 / awayOdds;
    const sum = pH + pD + pA;

    const nH = pH / sum;
    const nA = pA / sum;

    const expectedTotalGoals = Math.max(1.5, Math.min(4.5, 2.5 + (2.0 - over25Odds) * 1.1));
    const lambdaHome = expectedTotalGoals * (nH / (nH + nA));
    const muAway = expectedTotalGoals * (nA / (nH + nA));

    const scores = [];
    const scoreLines = [
      { h: 1, a: 0 }, { h: 2, a: 0 }, { h: 2, a: 1 }, { h: 3, a: 0 }, { h: 3, a: 1 }, { h: 3, a: 2 },
      { h: 0, a: 1 }, { h: 0, a: 2 }, { h: 1, a: 2 }, { h: 0, a: 3 }, { h: 1, a: 3 }, { h: 2, a: 3 },
      { h: 0, a: 0 }, { h: 1, a: 1 }, { h: 2, a: 2 }, { h: 3, a: 3 }
    ];

    const scoreVig = 1.15; 

    for (const line of scoreLines) {
      const pHome = this.poissonProbability(lambdaHome, line.h);
      const pAway = this.poissonProbability(muAway, line.a);
      const jointProb = pHome * pAway;

      const odds = Math.max(1.05, Math.min(100.00, 1 / (jointProb * scoreVig)));
      scores.push({
        selection: `${line.h} - ${line.a}`,
        odds: Number(odds.toFixed(2))
      });
    }

    return scores;
  }
}