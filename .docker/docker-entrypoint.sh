#!/bin/sh

DEFAULT_ENV_FILE=/home/nextjs/application/.env
LOCAL_ENV_FILE=/home/nextjs/application/.env.production

function generateEnvironment() {
    if [ -f $DEFAULT_ENV_FILE ]; then
        echo -e "\nGenerating local environment file"

        # Remove existing .env.local file
        if [ -f $LOCAL_ENV_FILE ]; then
            rm $LOCAL_ENV_FILE
        fi

        # Read file line by line with Internal Field Separator set to =
        # The result of this action are two variables: variable and value (line: variable=value)
        # https://stackoverflow.com/a/918931
        while IFS="=" read -r variable value; do

            # Skip empty lines and comments
            if [[ $variable ]] && [[ $variable != \#* ]]; then

                # Get value of the environmental variable
                # https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps#printing-shell-and-environmental-variables
                env=$(printenv "$variable")

                # If the environmental variable has value write it to .env.local file
                # Otherwise write default value from .env file
                if [[ $env ]]; then
                    echo "$variable=$env" >>$LOCAL_ENV_FILE
                else
                    echo "$variable=$value" >>$LOCAL_ENV_FILE
                fi
            fi
        done <$DEFAULT_ENV_FILE
    fi
}

function clean() {
    if [ -f $DEFAULT_ENV_FILE ]; then
        rm $DEFAULT_ENV_FILE
    fi
}

generateEnvironment
clean

echo -e "\nStarting NextJS application"
exec "$@"
