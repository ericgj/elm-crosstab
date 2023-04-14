SOURCES = $(shell find src/ -type f -name '*.elm')
EXAMPLE_SOURCES = $(shell find examples/ -type f -name '*.elm')
TEST_SOURCES = $(shell find tests/ -type f -name '*.elm')

build: 
	elm make

build-examples: 
	cd examples && elm make Main.elm --output=elm.js

format: 
	elm-format src/ examples/ tests/ --yes

review:
	./node_modules/elm-review/bin/elm-review

test:
	./node_modules/elm-test/bin/elm-test

.PHONY: build build-examples format review test

