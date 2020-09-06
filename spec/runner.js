/** @babel */

import {createRunner} from "atom-jasmine3-test-runner";

export default createRunner({
	specHelper: {
		customMatchers: true,
		attachToDom: true,
	},
});
