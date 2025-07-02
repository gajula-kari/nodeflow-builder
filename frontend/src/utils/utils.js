export const validateNodeName = (name, existingNodeNames) => {
  if (existingNodeNames?.includes(name)) {
    return "Name should be unique.";
  }
  return isValidJSVariable(name);
};

export const isValidJSVariable = (name) => {
  if (name.trim() === "") {
    return "Name cannot be empty.";
  }
  if (!isNaN(name)) {
    return "Name cannot be a number.";
  }
  if (/\s/.test(name)) {
    return "Name cannot contain spaces.";
  }
  if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) {
    return "Name must start with a letter, underscore, or dollar sign and contain only alphanumeric characters, underscores, or dollar signs.";
  }
};

export const getEnclosedString = (str) => {
  if (!str) return null;
  const match = str.match(/^{{(.+?)}}$/); // Regex to match {{xyz}}
  return match ? match[1] : null;
};
