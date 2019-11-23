#!/bin/sh

if [ -z "$BACKEND_SERVICE_HOST" ]; then
	echo "missing BACKEND_SERVICE_HOST"
	exit 1
fi

if [ -z "$BACKEND_SERVICE_PORT" ]; then
	echo "missing BACKEND_SERVICE_PORT"
	exit 1
fi

cat /etc/nginx/conf.d/template.conf | \
	sed -e "s/%BACKEND_SERVICE_HOST/$BACKEND_SERVICE_HOST/g" \
		-e "s/%BACKEND_SERVICE_PORT/$BACKEND_SERVICE_PORT/g" \
		> /etc/nginx/conf.d/webapp.conf

rm /etc/nginx/conf.d/template.conf

exec nginx -g "daemon off;"
