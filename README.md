# ec2meta
Easily retrieve meta-data, tags and other information about the AWS EC2 instance where the command is executed.

The tool is designed to be used in shell scripts, to easily retrieve information about the current EC2 instance.

For example:
```bash
LOCAL_IP=`ec2meta meta local-ipv4`
echo $LOCAL_IP
```

The tool requires either the instance to have a valid **IAM Role** or the user executing it to have a valid `~/.aws/credentials` file. In both cases, the credentials must be granted access to EC2 in readonly mode. Please see the documentation of the [AWS Node.js SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html) for more information.

## Metadata

Retrieve any instance meta-data by path.
The specified path is concatenated to `http://169.254.169.254/latest/meta-data/`.

Examples:
```bash
$ ec2meta meta instance-id
$ ec2meta meta iam/info
$ ec2meta meta network/
```

## Tags

Retrieve any instance tag by name:
```bash
$ ec2meta tag Name
```

## Instance identity document
Retrieve data from the [instance identify document](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-identity-documents.html) returned by `http://169.254.169.254/latest/dynamic/instance-identity/document`.
The data to be retrieved is specified as a JSON Pointer and it’s returned, by default, as a JSON string is the value is an object, or as a raw value in all other cased. The JSON output can be forced using the -j option.

Examples:
```bash
$ ec2meta identity
$ ec2meta identify region
$ ec2meta identify instanceId
```


## Instance data
Retrieve data from the description of the instance returned by `EC2.describeInstances`.
The data to be retrieved is specified as a JSON Pointer and it’s returned, by default, as a JSON string is the value is an object, or as a raw value in all other cased. The JSON output can be forced using the -j option.

Examples:
```bash
$ ec2meta instance
$ ec2meta instance Placement/AvailabilityZone
$ ec2meta instance NetworkInterfaces/0/Status
```
