export const requestToken = async () => {
  const sessionTokenUrl = 'https://opentdb.com/api_token.php?command=request';
  const data = await fetch(sessionTokenUrl);
  const dataJson = await data.json();
  localStorage.setItem('token', dataJson.token);
  return dataJson.token;
};
export const requestQuestion = async (token, questionUrl = 'https://opentdb.com/api.php?amount=5&token=') => {
  const data = await fetch(`${questionUrl}${token}`);
  return data.json();
};

export const requestQuestionAndSave = async (token, questionUrl) => {
  const questionObject = await requestQuestion(token, questionUrl);
  const { response_code: responseCode } = questionObject;
  if (responseCode === 0) {
    return { tokenIsValid: true, questionObject };
  } return { tokenIsValid: false };
};

export const requestTriviaApi = async (questionUrl) => { // questionUrl opcional
  let token = localStorage.getItem('token');
  if (token) {
    const request = await requestQuestionAndSave(token, questionUrl);
    if (!request.tokenIsValid) {
      token = await requestToken();
      requestQuestionAndSave(token);
    }
    return request.questionObject;
  }
};

export const saveScore = (score) => {
  // console.log(score);
  const teste = { player: score };
  console.log(teste);
  const player = JSON.stringify(teste);
  localStorage.setItem('state', player);
};
