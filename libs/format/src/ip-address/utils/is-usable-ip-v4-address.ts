export function isUsableIPv4Address(ipString: string, bits = 0) {
	const { networkAddress, broadcastAddress } = calcNetwork(ipString, bits);

	return ipString !== networkAddress && ipString !== broadcastAddress;
}

type IPv4Address = [number, number, number, number];

function toSubnetMask(bits: number): IPv4Address {
	const mask = [0, 0, 0, 0];

	for (let i = 0; i < bits; i++) {
		mask[Math.floor(i / 8)] += 1 << (7 - (i % 8));
	}

	return mask as IPv4Address;
}

function calcNetworkAddress(ipAddress: IPv4Address, subnetMask: IPv4Address) {
	return ipAddress.map(
		(octet, index) => octet & subnetMask[index],
	) as IPv4Address;
}

function calcBroadcastAddress(
	networkAddress: IPv4Address,
	subnetMask: IPv4Address,
) {
	return networkAddress.map(
		(octet, index) => octet | (~subnetMask[index] & 0xff),
	) as IPv4Address;
}

function calcNetwork(ipString: string, bits: number) {
	if (bits === 0) {
		return {
			networkAddress: "0.0.0.0",
			broadcastAddress: "255.255.255.255",
		};
	}

	const ipAddress = ipString.split(".").map(Number) as IPv4Address;
	const subnetMask = toSubnetMask(Number(bits));
	const networkAddress = calcNetworkAddress(ipAddress, subnetMask);
	const broadcastAddress = calcBroadcastAddress(networkAddress, subnetMask);

	return {
		networkAddress: networkAddress.join("."),
		broadcastAddress: broadcastAddress.join("."),
	};
}
