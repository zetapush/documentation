# README

Repository for the documentation of the ZetaPush platform

> Documentation available [here](https://zetapush.github.io/documentation/)

### What is this repository for?

### Usage

#### Generate documentation

To generate the HTML documentation, you can run the following command:

```
./mvnw generate-resources -P html
```

The generated HTML documentation is available in the folder `target/generated-docs`

To generate the PDF documentation, you can run the following command:

```
./mvnw generate-resources -P pdf
```

The generated PDF documentation is available in the folder `target/generated-docs`. Each `.adoc` source file has its own PDF file.

#### Change ZetaPush version in generated documentation

To generate the HTML documentation for a particular ZetaPush version, you can run the following command:

```
./mvnw generate-resources -P html -DzetapushVersion=<version>
```

To generate the PDF documentation for a particular ZetaPush version, you can run the following command:

```
./mvnw generate-resources -P pdf -DzetapushVersion=<version>
```

#### Change ZetaPush URLs in generated documentation

To generate the HTML documentation for a particular ZetaPush platform, you can run the following command:

```
./mvnw generate-resources -P html -DwebConsoleUrl=<url> -DcontactUrl=<url>
```

See `Documentation generation parameters` in `pom.xml` file to know which URLs and parameters can be changed.

#### Generate documentation and publish on gh-pages

Assuming you have cloned this documentation project a second time in `../documentation-site` and made a checkout of `gh-pages` branch.
To generate the HTML documentation for being published on Github Pages, you can run the following command:

```
./mvnw generate-resources -P html -Doutputdir=../documentation-site
```

The you can commit and push the result to update Github Pages.

#### Auto-reload

To automatically generate the HTML documentation after any change in `src/docs` directory, you can run the following command:

```
./mvnw fizzed-watcher:run -P html
```

To automatically generate the PDF documentation after any change in `src/docs` directory, you can run the following command:

```
./mvnw fizzed-watcher:run -P pdf
```

### Custom Asciidoctor extensions

#### Source code

How to highlight line 2 and 5:

```
[source, java, role="highlight-lines:2,5"]
----
line 1
line 2
line 3
line 4
line 5
----
```

Result:

![Result](./src/docs/resources/images/extensions-samples/highlight-1.png)

How to highlight lines from line 1 to line 4:

```
[source, java, role="highlight-lines:1-4"]
----
line 1
line 2
line 3
line 4
line 5
----
```

Result:

![Result](./src/docs/resources/images/extensions-samples/highlight-2.png)

How to mark line 2 and 5 as irrelevant:

```
[source, java, role="irrelevant-lines:2,5"]
----
line 1
line 2
line 3
line 4
line 5
----
```

Result:

![Result](./src/docs/resources/images/extensions-samples/irrelevant-1.png)

How to mark lines from line 1 to line 4 as irrelevant:

```
[source, java, role="irrelevant-lines:1-4"]
----
line 1
line 2
line 3
line 4
line 5
----
```

Result:

![Result](./src/docs/resources/images/extensions-samples/irrelevant-2.png)

How to collapse lines from line 1 to line 4:

```
[source, java, role="collapse-lines:1-4"]
----
line 1
line 2
line 3
line 4
line 5
----
```

Result:

![Result](./src/docs/resources/images/extensions-samples/collapse-1.png)

How to mark lines 1, 3, 4 and 5 with info icon:

```
[source, java, role="info-lines:1,3-5"]
----
line 1
line 2
line 3
line 4
line 5
----
```

Result:

![Result](./src/docs/resources/images/extensions-samples/info.png)

How to mark lines 1, 3, 4 and 5 with warn icon:

```
[source, java, role="warn-lines:1,3-5"]
----
line 1
line 2
line 3
line 4
line 5
----
```

Result:

![Result](./src/docs/resources/images/extensions-samples/warn.png)

How to mark lines 1, 3, 4 and 5 with error icon:

```
[source, java, role="error-lines:1,3-5"]
----
line 1
line 2
line 3
line 4
line 5
----
```

Result:

![Result](./src/docs/resources/images/extensions-samples/error.png)

How to mark line 1 as added and lines 3 and 4 as removed:

```
[source, java, role="diff-add-lines:1 diff-remove-lines:3-5"]
----
line 1
line 2
line 3
line 4
line 5
----
```

Result:

![Result](./src/docs/resources/images/extensions-samples/diff.png)

#### Tabs

How to display 2 tabs:

```
[role="tab-container"]
Sample

[role=tab]
Tab 1

Tab content
The tab content can contain several lines and any Asciidoc directive.

[role=tab]
Tab 2 contains code

Tab with some code

[source, html]
----
<body>
  <div class="sample">  <!-- 1 -->
  </div>
</body>
----
<1> This is a very important div

[role=tab-container-end]
-
```

The last `-` is mandatory after `[role=tab-container-end]`. Asciidoctor requires to have some text just after the directive `[role]`

Result:

![Result](./src/docs/resources/images/extensions-samples/tab-1.png)

How to display 2 tabs with icons:

```
[role="tab-container"]
Sample

[role=tab]
image:{images-dir}/icons/zetapush-logo.png[width=16,height=30] Tab 1

Tab content
The tab content can contain several lines and any Asciidoc directive.

[role=tab]
Tab 2 contains code

Tab with some code

[source, html]
----
<body>
  <div class="sample">  <!-- 1 -->
  </div>
</body>
----
<1> This is a very important div

[role=tab-container-end]
-
```

Result:

![Result](./src/docs/resources/images/extensions-samples/tab-2.png)

### Contribution guidelines

### Who do I talk to?
