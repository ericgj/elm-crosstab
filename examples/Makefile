SOURCES = $(wildcard *.elm) $(wildcard ../src/*.elm) $(wildcard ../src/*/*.elm) 
TARGET = app.js 
DEV_TARGET = app-debug.js 
MAIN = Main.elm

dev: $(DEV_TARGET)

build: $(TARGET)

format:
	elm format ./ --yes

$(TARGET): $(SOURCES)
	elm make $(MAIN) --output $@

$(DEV_TARGET): $(SOURCES)
	elm make $(MAIN) --debug --output $@

.PHONY: dev build format

