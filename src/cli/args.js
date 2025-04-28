const parseArgs = () => {
  const args = process.argv.slice(2);

  const formattedArgs = [];

  for (let i = 0; i < args.length; i += 2) {
    if (args[i].startsWith("--")) {
      const property = args[i].slice(2);
      const value = args[i + 1];

      formattedArgs.push(`${property} is ${value}`);
    }
  }

  console.log(formattedArgs.join(", "));
};

parseArgs();
