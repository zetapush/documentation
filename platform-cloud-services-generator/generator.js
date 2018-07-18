#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TARGET_DOCUMENTATION_PATH = path.join(process.cwd(), '../src/docs/asciidoc/common/');

const templates = require('./templates');
const filenames = require('./filenames');
const {
  toPascalCase
} = require('./utils');

const [
  launcher,
  filename,
  target
] = process.argv;

const getTemplateContext = (service) => ({
  service: {
    name: toPascalCase(service.itemId),
    description: [
      service.desc,
      '',
      ...service.notes
    ].join('\n')
  },
  method: {
    name: service.verbs[0].name,
    type: service.verbs[0].type.typeName
  },
  methods: service.verbs.map((verb) => ({
    name: verb.name,
    description: verb.notes ? verb.notes.join('\n') : '',
    input: verb.type.typeName,
    output: verb.returnType ? verb.returnType.typeName : 'void'
  }))
});

const generateService = (service) => {
  const context = getTemplateContext(service);
  const content = templates.service(context, service);
  const generated = path.join(TARGET_DOCUMENTATION_PATH, 'cloud-services', filenames.service(service))
  fs.writeFile(generated, content, { encoding: 'utf-8'}, (error) => {

  });
}

const generateType = (type) => {
  const context = type;
  const content = context.enumValues ? templates.typeEnum(context, type) : templates.typeInterface(context, type);
  const generated = path.join(TARGET_DOCUMENTATION_PATH, 'cloud-services-types', filenames.type(type))
  fs.writeFile(generated, content, { encoding: 'utf-8'}, (error) => {

  });
}

fs.readFile(path.join(process.cwd(), target), { encoding: 'utf-8'}, (error, content) => {
  const { strVersion, services, deployables } = JSON.parse(content);
  const WHITELIST = ['Cron', 'Gda', 'GroupManagement', 'Macro', 'Messaging', 'Notif', 'Logs', 'Sendmail', 'Search', 'Sms_ovh', 'Stack', 'Template', 'Trigger', 'Userdir', 'Zpfs_hdfs'];
  services
    .filter((service) => WHITELIST.indexOf(service.name) > -1)
    .forEach((service) => generateService(service));
  Object.values(deployables.types)
    .forEach((type) => generateType(type))
});
