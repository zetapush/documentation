# README #

Repository for the documentation of the ZetaPush platform

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


#### Auto-reload

To automatically generate the HTML documentation after any change in `src/docs` directory, you can run the following command:

```
./mvnw fizzed-watcher:run -P html
```

To automatically generate the PDF documentation after any change in `src/docs` directory, you can run the following command:

```
./mvnw fizzed-watcher:run -P pdf
```




### Contribution guidelines


### Who do I talk to?

