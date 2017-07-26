SOURCES = $(wildcard src/*.elm) $(wildcard src/*/*.elm) 
TARGET = /dev/null
MAIN = src/Crosstab.elm

build: $(TARGET)

format:
	elm format src --yes
	elm format src/Crosstab/ --yes
	elm format src/Matrix/ --yes

$(TARGET): $(SOURCES)
	elm make $(MAIN) --output $@

.PHONY: build format

