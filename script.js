const markovChain = {
  A: [
    { next: 'A', prob: 0.5 },
    { next: 'B', prob: 0.3 },
    { next: 'C', prob: 0.2 }
  ],
  B: [
    { next: 'A', prob: 0.1 },
    { next: 'B', prob: 0.6 },
    { next: 'C', prob: 0.3 }
  ],
  C: [
    { next: 'A', prob: 0.2 },
    { next: 'B', prob: 0.3 },
    { next: 'C', prob: 0.5 }
  ]
};

let currentState = 'A';

function updateUI() {
  document.querySelectorAll('.state').forEach(el => el.classList.remove('active'));
  const active = document.getElementById('state' + currentState);
  if (active) active.classList.add('active');
  document.querySelector('#currentState strong').textContent = currentState;
}

document.getElementById('nextStepBtn').addEventListener('click', () => {
  const options = markovChain[currentState];
  const randomNumber = Math.random();
  let cumulative = 0;
  let nextState = options[options.length - 1].next;
  let explanation = [`Current state: ${currentState}`, `Random number: ${randomNumber.toFixed(3)}`, `Choices:`];

  for (const option of options) {
    cumulative += option.prob;
    explanation.push(`  - ${option.next} (chance: ${option.prob})`);
    if (randomNumber <= cumulative) {
      nextState = option.next;
      explanation.push(`Picked: ${nextState} (since ${randomNumber.toFixed(3)} ≤ ${cumulative.toFixed(3)})`);
      break;
    }
  }

  currentState = nextState;
  updateUI();

  document.getElementById('explanation').textContent = explanation.join('\n');
});

updateUI();
