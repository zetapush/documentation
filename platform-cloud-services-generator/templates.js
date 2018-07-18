const { Type } = require('./types');
const filenames = require('./filenames');
const links = require('./links');

const service = ({ service, method, methods }, model) => 
`:relative-path: ../../
include::{docdir}/variables.adoc[]

== ${service.name}

${service.description}

${methods.map((method) => `
=== ${method.name}

${method.description}

.${method.name}(parameters: ${links.type(method.input)}): Promise<${links.type(method.output)}>

[source,typescript,linenums]
----
const response = await this.${service.name.toLowerCase()}.${method.name}(parameters);
----
`).join('')}

=== How to use it ?

.worker/index.ts
[source,typescript,linenums]
----
import { Injectable, ${service.name}, ${method.type} } from '@zetapush/platform'; <1>

@Injectable()
export default class Api {
  constructor(
    private ${service.name.toLowerCase()}: ${service.name} <2>
  ) {}
  async doStuff(parameters: ${Type.transform(method.type)}) {
    const response = await this.${service.name.toLowerCase()}.${method.name}(parameters); <3>
    return response;
  }
}
----
<1> Import \`${service.name}\` from platform
<2> Declare injected service
<3> Call injected service
`

const typeEnum = ({ type, enumValues = [] }, model) =>
`:relative-path: ../../
include::{docdir}/variables.adoc[]

== ${type}

=== Source

[source,typescript,linenums]
----
enum ${type} {
${enumValues.map((value) => `
  /**
   * ${value.description}
   */
  ${value.name} = ${typeof value.name === 'string' ? ['"', value.name, '"'].join(''): value.name};
`).join('')}
}
----
`

const typeInterface = ({ type, fields = []}, model) =>
`:relative-path: ../../
include::{docdir}/variables.adoc[]

== ${type}

=== Properties

${fields.map((field) => `

.${field.name}: ${Type.transform(field.type)};
${field.description}
`).join('')}

=== Source

[source,typescript,linenums]
----
interface ${type} {
${fields.map((field) => `
  /**
   * ${field.description}
   */
  ${field.name}: ${Type.transform(field.type)};
`).join('')}
}
----
`

module.exports = { service, typeEnum, typeInterface };
