https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-users/#api-rest-api-3-user-get

sudo chown $USER:$GROUP

sudo find ./ -type d \( -name '.git' -o -name 'vendor' -o -name 'node_modules' -o -name 'mysql-data' \) -prune -o -exec chown $USER:$GROUP {} +

model factory controller requests

## Laravel
php artisan make:model NAME -m -c -f --requests
php artisan make:model NAME -mfcR
php artisan make:command SendEmails
php artisan make:migration create_flights_table
php artisan make:mail SampleMail

php artisan schedule:list

### Regenerate Composer Autoload
composer dump-autoload

### Send Mail
https://laravel-school.com/posts/how-to-send-email-in-laravel-10/#step-2-set-email-configuration

#### Test Mail
php artisan tinker

Mail::raw('hello world', function($message) {
      $message->subject('Test Mail')->to('testmail@tes.com');
});

php artisan config:clear && php artisan cache:clear

### Auth Sanctum
https://www.twilio.com/blog/build-restful-api-php-laravel-sanctum

## Docker
Dev Mode
docker-compose -f docker-compose-dev.yml up
docker-compose -f docker-compose-dev.yml down

docker build -t roadmap_php_fpm -f Dockerfile_api .
docker build -t roadmap_front -f Dockerfile_front .

## Swagger - back/Laravel
docker exec -it roadmap_php_fpm bash --> composer run swagger
- Documentation interface -> http://localhost:3030/api/v1/documentation
- JSON Doc File -> http://localhost:3030/docs/api-docs.json

## Swagger - front/React
docker exec -it roadmap_front bash --> npm run openapi


## Reference
### React
https://react.dev/learn/reacting-to-input-with-state
https://react.dev/learn/typescript
https://react-bootstrap.netlify.app/docs/forms/form-text/

### Fontawesome
https://fontawesome.com/search?o=r&m=free

### Jira
https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comments/#api-group-issue-comments

https://www.npmjs.com/package/re-resizable

https://www.freecodecamp.org/news/how-to-dockerize-a-react-application/

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

Created git commit.

Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd front
  npm start

Happy hacking!
