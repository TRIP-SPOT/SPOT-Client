import { Font } from 'design-system';
import { ScrollView } from 'react-native';

export default function MyRoute() {
  return (
    <ScrollView className="bg-black">
      <Font color="white" type="title1">
        MyRoute
      </Font>
    </ScrollView>
  );
}
