CLIENT_SOURCES = $(wildcard *.elm) $(wildcard ../src/*.elm) $(wildcard ../src/*/*.elm) 
CLIENT_TARGET = app.js 
CLIENT_DEV_TARGET = app-debug.js 
CLIENT_MAIN = Main.elm

dev: $(CLIENT_DEV_TARGET)

build: $(CLIENT_TARGET)

$(CLIENT_TARGET): $(CLIENT_SOURCES)
	elm make $(CLIENT_MAIN) --output $@

$(CLIENT_DEV_TARGET): $(CLIENT_SOURCES)
	elm make $(CLIENT_MAIN) --debug --output $@

.PHONY: dev build

