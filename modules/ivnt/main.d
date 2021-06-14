module ivnt;

import std.typecons;
import std.algorithm.mutation;
import std.stdio;
import std.array;
import std.conv;

/**/
string input() {
	const string x = readln();
	const char[] y = x.dup;

	string z = "";

	int n = 0;

	foreach (i; y) {
		if (n + 1 != y.length) z = z ~ i;

		n++;
	}

	return z;
}

/**/
string join(string a, string b) {
	return a ~ b;
}

/**/
void goodThingsAboutPython() {
	return;
}

/**/
bool boolMaker(string str) {
	if (str == "true") {
		return true;
	} else return false;
}

/**/
int intMaker(string str) {
	return to!int(str);
}

/**/
int mod(int x, int y) {
	return x % y;
}

/**/
bool tRUE = true;
/**/
bool fALSE = false;