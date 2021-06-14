import * as fs from 'fs'
import * as YAML from 'yaml'

interface ModuleData {
	Name: string
	Adds: string[]
	Require: string[]
	Files: string[]
}

export class ModuleManager {
	public path: string

	private modules: ModuleData[]
	private names: string[]
	private files: string[]
	private imports: string[]

	public VALID_FUNCTIONS: string[]

	constructor(path: string) {
		this.path = path
		this.VALID_FUNCTIONS = []

		this.modules = []
		this.names = []
		this.files = []
		this.imports = []

		fs.readdirSync(path).forEach((i) => {
			if (fs.lstatSync(path).isDirectory()) {
				// console.log('Loading', path + '/' + i)
				this.loadModuleData(path + '/' + i)
			}
		})
	}

	private loadModuleData(path: string) {
		const data: ModuleData = YAML.parse(String(fs.readFileSync(path + '/module.yml')))

		this.modules.push(data)
		this.names.push(data.Name)
		data.Files.forEach(i => (this.files.includes(i)) ? null : this.files.push(path + '/' + i))
		data.Require.forEach(i => (this.imports.includes(i)) ? null : this.imports.push(i))

		data.Adds.forEach(i => (this.VALID_FUNCTIONS.includes(i)) ?
			null
			: this.VALID_FUNCTIONS.push(i))

	}

	public getFiles() {
		return Array.from(this.files, i => i = JSON.stringify(i)).join(' ')
	}

	public getImports() {
		return Array.from(this.imports, i => i = `import ${i};`).join('\n')
	}

	public get modulesData() {
		return this.modules
	}
}