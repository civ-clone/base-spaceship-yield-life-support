import AdditionalDataRegistry from '@civ-clone/core-data-object/AdditionalDataRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
import Effect from '@civ-clone/core-rule/Effect';
import Layout from '@civ-clone/core-spaceship/Layout';
import LifeSupport from '../LifeSupport';
import Part from '@civ-clone/core-spaceship/Part';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Slot from '@civ-clone/core-spaceship/Slot';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';
import Yield from '@civ-clone/core-spaceship/Rules/Yield';
import { expect } from 'chai';
import lifeSupport from '../AdditionalData/lifeSupport';
import reconstituteData from '@civ-clone/core-data-object/lib/reconstituteData';
import { setUpCity } from '@civ-clone/civ1-city/tests/lib/setUpCity';
import ChooseSlot from '@civ-clone/core-spaceship/Rules/ChooseSlot';
import exp = require('constants');

describe('Spaceship.lifeSupport', () => {
  it('should expose a lifeSupport key for a Spaceship when transferring', async () => {
    const ruleRegistry = new RuleRegistry(),
      city = await setUpCity({
        ruleRegistry,
      }),
      spaceship = new Spaceship(
        city.player(),
        new Layout(
          2,
          2,
          [
            new Slot(0, 0, 1, 1, [Part]),
            new Slot(0, 1, 1, 1, [Part]),
            new Slot(1, 0, 1, 1, [Part]),
            new Slot(1, 1, 1, 1, [Part]),
          ],
          ruleRegistry
        ),
        ruleRegistry
      ),
      additionalDataRegistry = new AdditionalDataRegistry();

    city.player().setCivilization(new Civilization());

    let alternator = false;

    ruleRegistry.register(
      new ChooseSlot(
        new Effect((part, layout) => {
          const [slot] = layout.slots().filter((slot) => slot.empty());

          return slot ?? null;
        })
      ),
      new Yield(
        new Effect(() => new LifeSupport((alternator = !alternator) ? -50 : 50))
      )
    );

    additionalDataRegistry.register(...lifeSupport());

    spaceship.add(new Part(city, ruleRegistry));

    const yields = spaceship.yields();

    expect(yields.length).eq(1);
    expect(yields[0]).instanceof(LifeSupport);
    expect(yields[0].value()).eq(-50);

    const object = reconstituteData(
      spaceship.toPlainObject(undefined, additionalDataRegistry)
    );

    expect(object.lifeSupport.value).eq(50);

    spaceship.add(new Part(city, ruleRegistry));
    spaceship.add(new Part(city, ruleRegistry));
    spaceship.add(new Part(city, ruleRegistry));

    const updatedObject = reconstituteData(
      spaceship.toPlainObject(undefined, additionalDataRegistry)
    );

    expect(updatedObject.lifeSupport.value).eq(0);
  });
});
