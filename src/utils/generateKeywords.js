export const handleGeneratingKeywordsForSearching = (str) => {
    const strArr = str.split("");

    let resultStr = "";
    const result = [];

    for(let s of strArr) {
        resultStr += s;
        result.push(resultStr);
    }

    return result;
}