handleFamilyAllowanceParentDetailsResponse(response?:ISubscribeDatagram<IFamilyAllowanceParentDetails>):void{

	if(!response){
		return;
	}
window.phoenix.bus.publish<IFamilyAllowanceChannel, IFamilyAllowanceTopic>('FAMILY_ALLOWANCE', 'FAMILY_ALLOWANCE_DETAILS_DATA', { payload: response,}); }
}

handleFamilyAllowanceUsageDetailsResponse(response?:ISubscribeDatagram<IFamilyAllowanceUsageDetails>):void{

	if(!response){
		return;
	}
window.phoenix.bus.publish<IFamilyAllowanceChannel, IFamilyAllowanceTopic>('FAMILY_ALLOWANCE', 'FAMILY_ALLOWANCE_DETAILS_DATA', { payload: response,}); }
}


handleFamilyAllowanceUsageDetailsResponse(response?:ISubscribeDatagram<IFamilyAllowanceMemoDetails>):void{

	if(!response){
		return;
	}
window.phoenix.bus.publish<IFamilyAllowanceChannel, IFamilyAllowanceTopic>('FAMILY_ALLOWANCE', 'FAMILY_ALLOWANCE_DETAILS_DATA', { payload: response,}); }
}


events(): void{
    window.phoenix.bus.subscribe<PlaformAuthorizationChannel, PlatformAuthorizationTopic, ISetLoginSessionInfoBusPayload>('PLATFORM_AUTHRIZATION', 'SET_LOGIN_SESSION_INFO', this.getLoginSessionInfo.bind(this)));
    window.phoenix.bus.subscribe<IFamilyAllowanceDetailsChannel, IFamilyAllowanceDetailsTopic, IFamilyAllowanceDetails>('FAMILY_ALLOWANCE_DETAILS', 'FAMILY_ALLOWANCE_DETAILS_RESPONSE', this.handleFamilyAllowanceDetailsResponse.bind(this)));
    window.phoenix.bus.subscribe<IFamilyAllowanceParentChannel, IFamilyAllowanceParentTopic, IFamilyAllowanceParentDetails>('FAMILY_ALLOWANCE_PARENT_DETAILS', 'FAMILY_ALLOWANCE_PARENT_RESPONSE', this.handleFamilyAllowanceParentDetailsResponse.bind(this)));
    window.phoenix.bus.subscribe<IFamilyAllowanceUsageChannel, IFamilyAllowanceUsageTopic, IFamilyAllowanceUsageDetails>('FAMILY_ALLOWANCE_USAGE_DETAILS', 'FAMILY_ALLOWANCE_USAGE_RESPONSE', this.handleFamilyAllowanceUsageDetailsResponse.bind(this)));
    window.phoenix.bus.subscribe<IFamilyAllowanceMemoChannel, IFamilyAllowanceMemoTopic, IFamilyAllowanceMemoDetails>('FAMILY_ALLOWANCE_MEMO_DETAILS', 'FAMILY_ALLOWANCE_MEMO_RESPONSE', this.handleFamilyAllowanceMemoDetailsResponse.bind(this)));
}

function subscribeToFamilyAllowanceEvent<T>(
    channel: string, 
    topic: string, 
    callback: (response: ISubscribeDatagram<T>) => void
): void {
    window.phoenix.bus.subscribe<IFamilyAllowanceChannel, IFamilyAllowanceTopic, ISubscribeDatagram<T>>(
        channel,
        topic,
        callback
    );
}
