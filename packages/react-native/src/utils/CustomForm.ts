import { Platform } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { getDateString, normalizeDate } from './date';

class CustomForm {
  #form: FormData;

  constructor() {
    this.#form = new FormData();
  }

  append(key: string, value: unknown) {
    this.#form.append(key, value);
  }

  appendImage(key: string, image: Asset) {
    this.#form.append(key, {
      name: `${getDateString(normalizeDate())}_${image.fileName}`,
      type: image.type,
      uri:
        Platform.OS === 'ios' ? image.uri?.replace('file://', '') : image.uri,
    });
  }

  getForm() {
    return this.#form;
  }
}

export default CustomForm;
