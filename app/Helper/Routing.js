export default class Helper {
  /**
   * Get the base path for the react router by project name.
   *
   * This should be used when the react project is hosting in the sub-directory. Use this method with Browser Router and set the basename as the base path.
   *
   * @param {string} projectName -String of the project name.
   * @returns {string} -The base path.
   */
  static getBasePathForRouteWithProjectName(projectName = '') {
    const path = location.href;
    const pathParts = path.split('/');
    let fixedPath = '';

    for (let i = 0; i < pathParts.length; i += 1) {
      const toCheck = pathParts[i];
      if (toCheck.indexOf(projectName) >= 0) {
        // topLevelFound = true;
        fixedPath = pathParts.slice(0, i + 1).join('/');
        break;
      }
    }
    if (fixedPath.length === 0) {
      fixedPath = path;
    }

    if (fixedPath.charAt(fixedPath.length - 1) === '/') {
      fixedPath = fixedPath.substring(0, fixedPath.length - 1);
    }

    return fixedPath.replace(/^https?:\/\/[^/]+/, '');
  }

  /**
   * Get the base path for the react router by giving the top lever path.
   *
   * This should be sued when the react project is hotsing in the sub-directory. User should provide the top level path as an array. Use this method with Browser Router and set the basename as the base path.
   *
   * @param {array} topLevelPath - Array of the top level path. eg. ['/', 'Transferable-Skills']
   * @returns {string} - The base path
   */
  static getBasePathForRouteWithToplevel(topLevelPath = []) {
    const path = location.href;
    const pathParts = path.split('/');
    let topLevelFound = false;
    let fixedPath = '';

    for (let i = pathParts.length - 1; i >= 0; i -= 1) {
      const toCheck = pathParts[i];
      if (topLevelPath.indexOf(toCheck) > -1) {
        topLevelFound = true;
      } else if (topLevelFound) {
        fixedPath = pathParts.slice(0, i + 1).join('/');
        break;
      }
    }
    if (fixedPath.length === 0) {
      fixedPath = path;
    }
    return fixedPath.replace(/^https?:\/\/[^/]+/, '');
  }
}
