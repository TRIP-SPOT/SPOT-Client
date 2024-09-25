export const hasLastConsonantLetter = (text: string): boolean => {
  return (text.charCodeAt(text.length - 1) - '가'.charCodeAt(0)) % 28 !== 0;
};

function jugeokJosa(txt: string) {
  const charCode = txt.charCodeAt(txt.length - 1);

  const 받침 = (charCode - 44032) % 28 !== 0;

  if (받침) {
    return `${txt}이`;
  }
  return `${txt}가`;
}

export default jugeokJosa;
