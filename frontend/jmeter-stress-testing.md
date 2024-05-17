
> .\jmeter -n -t ole-config.jmx -l logs.txt

- N tells the jMeter to run in CLI MODE
- T template to be used
- L store logs

*In thread group, you can specify the count of users that will interact to the stress testing.*
> Potion > Add > Thread Users > Thread Group

*In sampler, you can specify the host and port to be used in recoding of actions thru FIREFOX Browser. It is recommended to use FIREFOX to avoid some errors while performing the record actions. **NOTE: Add server name (URL) and path*** 

> Settings > Add > Sampler > HTTP Request
> Potion > Add > Non-Test Elements > HTTPS Test Script Recorder
> Settings > Add > Logic Controller > Recording Controller

Open Firefox Browser > Add Proxy

> HTTP Proxy: localhost
> Port: 8181 (or any port you've set)
> App use proxy to all protocols as well.

Add certificates in Firefox if not set:

> Goto certificates section in your browser
> Authorities > Import  > CERT IN BIN folder
> HTTPS Test Script Recorder > Add > Listener > View Results Tree
> HTTPS Test Script Recorder  > [SELECT TARGET CONTROLLER]