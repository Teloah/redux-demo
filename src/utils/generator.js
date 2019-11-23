function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function generateCard() {
  let card = '9'
  for (let i = 0; i < 15; i++) {
    card = card + getRandomInt(9)
  }
  return card
}

export function generator() {
  const types = ['ATM', 'POS', 'EComm']
  return {
    type: types[getRandomInt(3)],
    card: generateCard(),
    amount: `${getRandomInt(1000)}.${getRandomInt(99)}`
  }
}
