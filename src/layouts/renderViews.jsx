import React from "react";
import { useConnect } from "../hooks/useConnect";

const RenderViews = (Views) => {
	const { views } = useConnect();
	const View = Views[views.view];
	const Wrapper = views.Wrapper ? Views[views.Wrapper] : Views["AppWrapper"];

	const content = <View />;
	return <Wrapper>{content}</Wrapper>;
};

export default RenderViews;
