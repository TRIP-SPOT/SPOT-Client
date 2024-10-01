export default function removeHTMLTag(content: string) {
  return content.replace('<br>', '').replace('</br>', '').replace('<br />', '');
}
