"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalData = void 0;
const AdditionalData_1 = require("@civ-clone/core-data-object/AdditionalData");
const LifeSupport_1 = require("../LifeSupport");
const Spaceship_1 = require("@civ-clone/core-spaceship/Spaceship");
const getAdditionalData = () => [
    new AdditionalData_1.default(Spaceship_1.default, 'lifeSupport', (spaceship) => spaceship.yields().reduce((lifeSupport, spaceshipYield) => {
        if (spaceshipYield instanceof LifeSupport_1.default) {
            lifeSupport.add(spaceshipYield);
        }
        return lifeSupport;
    }, new LifeSupport_1.default())),
];
exports.getAdditionalData = getAdditionalData;
exports.default = exports.getAdditionalData;
//# sourceMappingURL=lifeSupport.js.map