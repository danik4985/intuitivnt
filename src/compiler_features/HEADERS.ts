import { modules } from '../main'

export const HEADERS = () => `// Generated by intuitivn't 1.0.0
import std;
import std.stdio;

${modules.getImports()}

void main(string[] args) {
`