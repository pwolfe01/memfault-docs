---
id: test-patterns-for-chunks-endpoint
title: Test Patterns for Chunks Endpoint
sidebar_label: Chunks Endpoint Test
---

Background: For more information about the Memfault Data pipeline in general see
[this tutorial](data-from-firmware-to-cloud.md).

In the following tutorial we will provide several test patterns which can be
used to check that the data pipeline is hooked up correctly without needing to
integrate any parts of the Memfault C SDK.

## Setup

A Project API key will be needed in order to communicate with Memfault's web
services. Go to [https://app.memfault.com/](https://app.memfault.com/), navigate
to the project you want to use and select 'Settings'→'General'. The 'Project API
Key' listed is what you will want to use.

## Posting a Chunk

The underlying messages sent by the Memfault C SDK using the chunks endpoint can
span one or more chunks. This happens transparently for the end user of the API.

In this article we will explore sending a heartbeat event for a device with
serial number `TESTSERIAL`. Upon success you will be able to see the event by
going to [https://app.memfault.com/](https://app.memfault.com/) and selecting
'Event'. It will look like this:

![/img/docs/embedded/chunks-all-events.png](/img/docs/embedded/chunks-all-events.png)

Below we will list some example calls to the
[chunk endpoint](https://api-docs.memfault.com/?version=latest#66b0e390-2c3e-4c0d-b6c2-836a287b9e5f)
as a curl command but they can be converted to whatever format is easiest for
the your setup.

Note you will have to replace `<YOUR_PROJECT_KEY>` with the one you grabbed in
the setup instructions above for the command to work

### Event message encoded in a single chunk

```bash
# Chunk 1/1
echo \
0031e402a702010301076a5445535453455249414c0a6d746573742d736f667477617265096a\
312e302e302d74657374066d746573742d686172647761726504a101a1726368756e6b5f7465\
73745f7375636365737301\
| xxd -p -r | curl -X POST https://chunks.memfault.com/api/v0/chunks/TESTSERIAL\
 -H 'Memfault-Project-Key:<YOUR_PROJECT_KEY>'\
 -H 'Content-Type:application/octet-stream' --data-binary @- -i
```

### Same event message encoded in two chunks

```bash
# Event message spanning across two individual chunks
# Note: Event will appear in UI once both messages have arrived

# Chunk 1/2
echo \
405431e402a702010301076a5445535453455249414c0a6d746573742d736f667477617265096a\
312e302e302d746573\
| xxd -p -r | curl -X POST https://chunks.memfault.com/api/v0/chunks/TESTSERIAL\
 -H 'Memfault-Project-Key:<YOUR_PROJECT_KEY>'\
 -H 'Content-Type:application/octet-stream' --data-binary @- -i

# Chunk 2/2
echo \
802c74066d746573742d686172647761726504a101a1726368756e6b5f746573745f7375636365\
737301\
| xxd -p -r | curl -X POST https://chunks.memfault.com/api/v0/chunks/TESTSERIAL\
 -H 'Memfault-Project-Key:<YOUR_PROJECT_KEY>'\
 -H 'Content-Type:application/octet-stream' --data-binary @- -i
```
