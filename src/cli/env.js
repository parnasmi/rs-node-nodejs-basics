const parseEnv = () => {
  const envVars = process.env;

  const vars = Object.keys(envVars)
    .filter((key) => key.startsWith("RSS_"))
    .map((key) => `${key}=${envVars[key]}`);

  console.log(vars.join(";"));
};

parseEnv();
