import { Platform } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { Image } from 'react-native-image-crop-picker';
import { getDateString, normalizeDate } from './date';

class CustomForm {
  #form: FormData;

  constructor() {
    this.#form = new FormData();
  }

  append(key: string, value: unknown) {
    this.#form.append(key, value);
  }

  appendImage(key: string, image: Asset | Image) {
    if ((image as Image).mime) {
      const cropedImage = image as Image;
      this.#form.append(key, {
        name: `${getDateString(normalizeDate())}`,
        type: cropedImage.mime,
        uri:
          Platform.OS === 'ios'
            ? cropedImage.path?.replace('file://', '')
            : cropedImage.path,
      });
      return;
    }

    const normalImage = image as Asset;
    this.#form.append(key, {
      name: `${getDateString(normalizeDate())}_${normalImage.fileName}`,
      type: normalImage.type,
      uri:
        Platform.OS === 'ios'
          ? normalImage.uri?.replace('file://', '')
          : normalImage.uri,
    });
  }

  getForm() {
    return this.#form;
  }
}

export default CustomForm;
