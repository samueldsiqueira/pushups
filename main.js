const exercisePrograms = {
    pushups: pushupContent,
    situps: [
      {
        name: 'w3t1d1',
        steps: [
          'do 15 situps',
          'rest 60 seconds',
          'do 18 situps',
          'rest 60 seconds',
          'do 11 situps',
          'rest 60 seconds',
          'do 11 situps',
          'rest 60 seconds',
          'do at least 14 situps',
          'done!',
        ],
      },
      {
        name: 'w3t1d2',
        steps: [
          'do 15 situps',
          'rest 60 seconds',
          'do 18 situpsaa',
          'rest 60 seconds',
          'do 12 situps',
          'rest 60 seconds',
          'do 12 situps',
          'rest 60 seconds',
          'do at least 18 situps',
          'done!',
        ],
      },
    ],
  };
  
  let currentProgram;
  let currentSession;
  let currentSteps;
  let currentStepIndex;
  
  let elapsedTime = 0;
  let interval;
  
  const setCookies = (name, value) => {
    document.cookie = `${name}=${value}`;
  };
  
  const getCookies = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1, cookie.length);
      }
    }
    return null;
  };
  
  const setExerciseProgram = (program) => {
    currentProgram = program;
    const previousProgram = parseInt(getCookies('program')) || 0;
    setExerciseSession(previousProgram);
  };
  
  const setExerciseSession = (session) => {
    currentSession = session;
    const exerciseSession = exercisePrograms[currentProgram][currentSession];
    if (exerciseSession) {
      currentSteps = exerciseSession.steps;
      setCookies('program', currentSession);
      console.log(`setting ${currentSession}`);
      currentStepIndex = 0;
      let html = '';
      for (let i = 0; i < currentSteps.length; i++) {
        html += `<div id="step${i}">${currentSteps[i]}</div>`;
      }
      document.getElementById('mySession').innerHTML = parseSessionName(exerciseSession.name);
      document.getElementById('mySet').innerHTML = html;
      document.getElementById('myLabel').innerHTML = 'Ready to Start???';
    }
  };
  
  const startExerciseTimer = (elementName) => {
    interval = setInterval(() => {
      elapsedTime += 1;
      updateExerciseTimer(elementName);
    }, 1000);
  };
  
  const stopExerciseTimer = () => {
    clearInterval(interval);
    interval = null;
  };
  
  const resetExerciseTimer = () => {
    elapsedTime = 0;
    updateExerciseTimer('Clock');
  };
  
  const updateExerciseTimer = (elementName) => {
    document.getElementById(elementName).innerHTML = Math.round(elapsedTime);
  };
  
  const handleGoButtonClick = () => {
    document.getElementById('myLabel').innerHTML = currentSteps[currentStepIndex];
  
    const currentStepElement = document.getElementById(`step${currentStepIndex}`);
    const previousStep = currentStepIndex > 0 ? document.getElementById(`step${currentStepIndex - 1}`) : null;
  
    if (previousStep) previousStep.style.backgroundColor = 'pink';
    currentStepElement.style.backgroundColor = '#d2d2d2';
  
    if (currentStepIndex + 1 < currentSteps.length) {
      currentStepIndex++;
      if (previousStep) previousStep.innerHTML += `     ${Math.round(elapsedTime)}`;
    } else {
      setExerciseSession(currentSession + 1);
    }
  
    elapsedTime = 0;
  };
  
  const handleNextSessionButtonClick = () => {
    if (currentSession + 1 < exercisePrograms[currentProgram].length) {
      currentSession++;
      setExerciseSession(currentSession);
    }
  };
  
  const handlePrevSessionButtonClick = () => {
    if (currentSession - 1 >= 0) {
      currentSession--;
      setExerciseSession(currentSession);
    }
  };
  
  const handleProgramButtonClick = (program) => {
    setExerciseProgram(program);
  };
  
  const parseSessionName = (code) => `Week ${code[1]} Tier ${code[3]} Day ${code[5]}`;
  
  document.getElementById('myGoButton').onclick = handleGoButtonClick;
  document.getElementById('myNextSessionButton').onclick = handleNextSessionButtonClick;
  document.getElementById('myPrevSessionButton').onclick = handlePrevSessionButtonClick;
  document.getElementById('myPushupsButton').onclick = () => handleProgramButtonClick('pushups');
  document.getElementById('mySitupsButton').onclick = () => handleProgramButtonClick('situps');
  
  // Start the timer
  startExerciseTimer('Clock');
  