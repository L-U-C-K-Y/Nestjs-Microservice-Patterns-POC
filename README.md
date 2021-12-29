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
- Each API gateway has 3 REST endpoints (`/first`, `/otherFromFirst`, `/otherCommandFromFirst`)
- `/first`, `/otherFromFirst` have the same command, but different data and compared to those 2, `/otherCommandFromFirst` has another command and again other data
- 3 Microservices
- 1000 requests for each (of the 6) endpoint have been sent in the **same** queue so that both API gateways use to check if there might be interference

![image](https://user-images.githubusercontent.com/14868134/147697138-34f91450-a4db-4448-a26f-cae668e44c31.png)

#### Possible Issues

It seems that the api-gateway crashes, when there is a client subscribed to the queue that does not have all the same `message-pattern` as the gateway.

This could for example appear if there are different versions running.

##### How to reproduce:

1. Keep first microservice as-is: `@MessagePattern({ cmd: 'first_service' })`
2. Change replica-2 and replica-3 of first microservice `@MessagePattern({ cmd: 'first_service' })` to `@MessagePattern({ cmd: 'first_service1' })`
3. Call `localhost:6001/first`

I don't know how critical it is, but it was a bit curious for me that even with 1 correct consumer, it still failed.
Not sure, but I assume this is Nestjs related or load balancing.

Error messages:

`There is no matching message handler defined in the remote service.`

![image](https://user-images.githubusercontent.com/14868134/147698218-bafe0d14-f271-4fab-b414-568159e08cb0.png)


## Appendix

See implementation details here: https://docs.nestjs.com/microservices/basics

Further, according to the docs, RabbitMQ Request-Reply comes with the following caveats, needs to be checked if this applies to Nestjs's implementation too: https://www.rabbitmq.com/direct-reply-to.html#limitations

- The RPC client must consume in the automatic acknowledgement mode. This is because there is no queue for the reply message to be returned to if the client disconnects or rejects the reply message.
- Reply messages sent using this mechanism are in general not fault-tolerant; they will be discarded if the client that published the original request subsequently disconnects. The assumption is that an RPC client will reconnect and submit another request in this case.
- The name amq.rabbitmq.reply-to is used in basic.consume and the reply-to property as if it were a queue; however it is not. It cannot be deleted, and does not appear in the management plugin or rabbitmqctl list_queues.
- If the RPC server publishes with the mandatory flag set then amq.rabbitmq.reply-to.* is treated as not a queue; i.e. if the server only publishes to this name then the message will be considered "not routed"; a basic.return will be sent if the mandatory flag was set.

