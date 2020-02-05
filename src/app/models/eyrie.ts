import { Bot, BotName } from './bot';

export class EyrieBot extends Bot {

  public name: BotName = 'Eyrie';

  public setupPosition = 'B';
  public setupRules = [
    `Place the keep token in a random corner clearing.`,

    `Place 1 warrior in each clearing, except the corner clearing diagonally opposite from the keep.
    Add an additional warrior to the clearing with the keep token. _(Place 12 warriors in total.)_`,

    `Place 1 sawmill, workshop and recruiter randomly among the clearings adjacent to the keep token.
    _(Place 3 in total. One per clearing.)_`
  ];

  public difficultyDescriptions = {
    Easy: `
During setup, add only one Loyal Vizier to the Decree.
    `,
    Normal: 'Nothing is changed.',
    Challenging: `
During setup, take one bird Ambush from the deck and add it to the bird column of the Decree.
    `,
    Nightmare: `
During setup, take one bird Ambush from the deck and add it to the bird column of the Decree.

At the end of Evening, score one victory point.
    `
  };

  public rules = [
    {
      name: 'Poor Manual Dexterity',
      text: `You have no hand of cards. You cannot discard cards.
      If a human would take a card from you, they draw a card instead.
      If a human would give a card to you, they discard it, and you score **vp:1**.`,
      isActive: true
    },
    {
      name: 'Hates Surprises',
      text: 'Ambush cards cannot be played against you.',
      isActive: true
    },
    {
      name: 'Lords of the Forest',
      text: 'You rule any clearings where you are tied in presence.',
      isActive: true
    },
    {
      name: 'Nobility',
      text: `
You now fall into turmoil if you cannot place a roost or a warrior.

Whenever you fall into turmoil, you do not lose victory points. Instead, you score one victory point per bird card in the Decree.
      `,
      canToggle: true
    },
    {
      name: 'Relentless',
      text: `
After resolving the Decree, remove all defenseless buildings and tokens in any clearing with Eyrie warriors.
      `,
      canToggle: true
    },
    {
      name: 'Swoop',
      text: `
At the end of Daylight, place two warriors in the clearing of highest priority with no Eyrie pieces.
      `,
      canToggle: true
    },
    {
      name: 'War Tax',
      text: `
Whenever you remove an enemy building or token, its owner loses one victory point.
      `,
      canToggle: true
    },
  ];

  public customData = {
    currentSuit: 'bird',

    decree: {
      fox: 0,
      mouse: 0,
      bunny: 0,
      bird: 0
    },

    buildings: []
  };

  public birdsong() {
    return [
      `Reveal an order card.`,
      `Craft order card for **vp:1** if it shows an available item.`,
      `Add the order card to the matching Decree column.`
    ];
  }

  public daylight() {
    if (this.customData.currentSuit === 'bird') {
      return [
        `Battle in all clearings. _(Defender is the player with most pieces, then victory points.)_`,

        `Recruit two warriors in each of the two clearings you rule with lowest priority.
        If you only rule one clearing, place all four warriors there.`,

        `Build a building of the type with the most pieces on the map in a clearing you rule with the most Marquise Warriors.
        _(On a tie between sawmills and any other building types, place a sawmill.
          On a tie between workshops and recruiters but not sawmills, place a recruiter.)_`,

        `Move all but three of your warriors from each clearing to the adjacent clearing with the most enemy pieces.
        Then battle in each clearing you moved into.`
      ];
    }

    let building = '';
    if (this.customData.currentSuit === 'fox')   { building = 'sawmill'; }
    if (this.customData.currentSuit === 'bunny') { building = 'workshop'; }
    if (this.customData.currentSuit === 'mouse') { building = 'recruiter'; }

    return [
      `Battle in each ${this.customData.currentSuit} clearing. _(Defender is the player with most pieces, then victory points.)_`,

      `Recruit four warriors evenly spread across ${this.customData.currentSuit} clearings you rule.
      If you rule three ${this.customData.currentSuit} clearings, place the fourth warrior in the ${this.customData.currentSuit}
      clearing with the highest priority`,

      `Build a ${building} in a clearing you rule with the most Marquise warriors.`,

      `Move all but three of your warriors from each ${this.customData.currentSuit} clearing to the adjacent
      clearing with the most enemy pieces.`,

      `If you did not place a building this turn and have five or fewer buildings on the map, discard the order card,
      draw a new one, and repeat Daylight.`
    ];
  }

  public evening() {
    if (this.customData.currentSuit === 'bird') {
      return [
        `Score **vp:1** for each single most building on the board. Then discard order card(s).`
      ];
    }

    return [
      `Score **vp:1** for each building on the board matching ${this.customData.currentSuit} clearings. Then discard order card(s).`
    ];
  }
}
