const program_seeds = [
    {
      name: "w1t3d1",
      steps: [10, 12, 7, 7, 9]
    },
    {
      name: "w1t3d2",
      steps: [10, 12, 8, 8, 12]
    },
    {
      name: "w1t3d3",
      steps: [11, 15, 9, 9, 13]
    },
    {
      name: "w2t3d1",
      steps: [14, 14, 10, 10, 15]
    },
    {
      name: "w2t3d2",
      steps: [14, 16, 12, 12, 17]
    },
    {
      name: "w2t3d3",
      steps: [16, 17, 14, 14, 20]
    },
    {
      name: "w3t3d1",
      steps: [14, 18, 14, 14, 20]
    },
    {
      name: "w3t3d2",
      steps: [20, 25, 15, 15, 25]
    },
    {
      name: "w3t3d3",
      steps: [22, 30, 20, 20, 28]
    },
    {
      name: "w4t3d1",
      steps: [21, 25, 21, 21, 32]
    },
    {
      name: "w4t3d2",
      steps: [25, 29, 25, 25, 36]
    },
    {
      name: "w4t3d3",
      steps: [29, 33, 29, 29, 40]
    }
  ];
  
  const extra_excercises = [
    "Pancha",
    "Prancha Lado esquerdo",
    "Prancha Lado direito"
  ];
  
  const parseProgram = (program_seed) => {
    const content = [];
    let last = 0;
    let message = "";
  
    for (let a = 0; a < program_seed.steps.length; a++) {
      last = a === program_seed.steps.length - 1;
  
      if (last) {
        message = "do at least ";
      } else {
        message = "do ";
      }
  
      content.push(message + program_seed.steps[a] + " pushups");
  
      if (!last) {
        content.push("rest 60 seconds");
      }
    }
  
    content.push("done!");
  
    return {
      name: program_seed.name,
      steps: content,
    };
  };
  
  const pushupContent = program_seeds.map(parseProgram);
  
  