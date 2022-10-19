import { PlatformAccessory } from 'homebridge';
import TuyaDevice from '../device/TuyaDevice';
import { TuyaPlatform } from '../platform';
import BaseAccessory from './BaseAccessory';
import LightAccessory from './LightAccessory';
import OutletAccessory from './OutletAccessory';
import SwitchAccessory from './SwitchAccessory';

import LegacyAccessoryFactory from './LegacyAccessoryFactory';

export default class AccessoryFactory {
  static createAccessory(
    platform: TuyaPlatform,
    accessory: PlatformAccessory,
    device: TuyaDevice,
  ): BaseAccessory {

    let handler;
    switch (device.category) {
      case 'kj':
        // TODO AirPurifierAccessory
        break;
      case 'dj':
      case 'dd':
      case 'fwd':
      case 'tgq':
      case 'xdd':
      case 'dc':
      case 'tgkg':
        handler = new LightAccessory(platform, accessory);
        break;
      case 'cz':
      case 'pc':
        handler = new OutletAccessory(platform, accessory);
        break;
      case 'kg':
      case 'tdq':
        handler = new SwitchAccessory(platform, accessory);
        break;
      case 'fs':
      case 'fskg':
        // TODO Fanv2Accessory
        break;
      case 'ywbj':
        // TODO SmokeSensorAccessory
        break;
      case 'qn':
        // TODO HeaterAccessory
        break;
      case 'ckmkzq':
        // TODO GarageDoorAccessory
        break;
      case 'cl':
        // TODO WindowCoveringAccessory
        break;
      case 'mcs':
        // TODO ContactSensorAccessory
        break;
      case 'rqbj':
      case 'jwbj':
        // TODO LeakSensorAccessory
        break;
    }

    if (!handler) {
      platform.log.warn(`Create accessory using legacy mode: ${device.name}.`);
      handler = LegacyAccessoryFactory.createAccessory(platform, accessory, device);
    }

    if (!handler) {
      platform.log.warn(`Unsupported device: ${device.name}.`);
      handler = new BaseAccessory(platform, accessory);
    }

    return handler;
  }
}
