// jest.config.js
module.exports = {
	verbose: true,
	collectCoverage: true,
	testEnvironment: 'node',
	moduleFileExtensions: [
		"ts",
		"tsx",
		"js",
		"jsx",
		"json",
		"node"
	],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testMatch: [
		"**/tests/*\.test\.*"
	],
	testPathIgnorePatterns: [
		"/node_modules/",
		"/dist/"
	]
};
