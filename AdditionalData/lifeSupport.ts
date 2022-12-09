import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import LifeSupport from '../LifeSupport';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';

export const getAdditionalData = () => [
  new AdditionalData(Spaceship, 'lifeSupport', (spaceship: Spaceship) =>
    spaceship.yields().reduce((lifeSupport, spaceshipYield) => {
      if (spaceshipYield instanceof LifeSupport) {
        lifeSupport.add(spaceshipYield);
      }

      return lifeSupport;
    }, new LifeSupport())
  ),
];

export default getAdditionalData;
