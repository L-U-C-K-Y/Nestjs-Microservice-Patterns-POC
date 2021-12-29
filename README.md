# Nestjs Microservice Message Patterns

Testing our different message patterns that are built-in to Nestjs.

## Status

- **Redis**: Pub-Sub works reliably and fast, but not Request-Reply
- **RabbitMQ**: Request-Reply work reliably and fast, microservices can join queues fast
- **Kafka**: Works fast, but unreliably, currently, this build has issues with joining and subscribing to certain topics

### RabbitMQ Testing

The following test scenario has succeeded:

#### Scenario 1

- 2 API gateways (`localhost:6001`, `localhost:6002`)
- Each API gateway has 2 REST endpoints (`/first`, `/otherFromFirst`)
- 3 Microservices
- 1000 requests for each endpoint (4 requests) have been sent in the **same** queue so that both API gateways use to check if there might be interference

![image](https://user-images.githubusercontent.com/14868134/147696195-a1731188-fac6-4967-a3df-1a1ea8f38339.png)

## Appendix

See implementation details here: https://docs.nestjs.com/microservices/basics

Further, according to the docs, RabbitMQ Request-Reply comes with the following caveats, needs to be checked if this applies to Nestjs's implementation too: https://www.rabbitmq.com/direct-reply-to.html#limitations

- The RPC client must consume in the automatic acknowledgement mode. This is because there is no queue for the reply message to be returned to if the client disconnects or rejects the reply message.
- Reply messages sent using this mechanism are in general not fault-tolerant; they will be discarded if the client that published the original request subsequently disconnects. The assumption is that an RPC client will reconnect and submit another request in this case.
- The name amq.rabbitmq.reply-to is used in basic.consume and the reply-to property as if it were a queue; however it is not. It cannot be deleted, and does not appear in the management plugin or rabbitmqctl list_queues.
- If the RPC server publishes with the mandatory flag set then amq.rabbitmq.reply-to.* is treated as not a queue; i.e. if the server only publishes to this name then the message will be considered "not routed"; a basic.return will be sent if the mandatory flag was set.

