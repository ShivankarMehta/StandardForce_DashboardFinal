import translate from "translate";

export const translateAndCapitalize = (text) => {
  return new Promise((resolve) => {
    // Check if text is empty or null, and return "Nagasaki" if true
    if (!text) {
      console.log("I am here");
      resolve("Nagasaki");
      return;
    }

    translate(text, { from: "ja", to: "en" })
      .then((res) => {
        // Ensure there's text to work with, otherwise return a default value
        const resultText = res.text ? res.text : "Nagasaki";
        const capitalized = resultText.split(" ")[0];
        resolve(capitalized);
      })
      .catch((err) => {
        console.error(err);
        // Fallback to the original text in case of an error, capitalized
        // If the original text is empty or null, use "Nagasaki" as the fallback
        const fallbackText = "Nagasaki";
        resolve(fallbackText);
      });
  });
};

export const buildPrefactureData = async (data) => {
  const prefData = {};
  let totalCustomers = 0;
  const zipCodes = Object.keys(data.zipCodes);
  await Promise.all(
    zipCodes.map(async (zipCode) => {
      const address = await new Promise((resolve) =>
        postal_code.get(zipCode, resolve)
      );
      if (address && address.prefecture) {
        const prefectureEn = await translateAndCapitalize(address.prefecture);
        const count = data.zipCodes[zipCode];
        prefData[prefectureEn] = (prefData[prefectureEn] || 0) + count;
        totalCustomers += count;
      }
    })
  );

  console.log("pref Data: ", prefData);
  return { totalNumberOfZipcodes: data.totalNumberOfZipcodes, ...prefData };
};
