# Nestjs Microservice Message Patterns

Testing our different message patterns that are built-in to Nestjs.

Status: 

- Redis: Pub-Sub works reliably and fast, but not Request-Reply
- RabbitMQ: Request-Reply work reliably and fast, microservices can join queues fast
- Kafka: Works fast, but unreliably, currently, this build has issues with joining and subscribing to certain topics
