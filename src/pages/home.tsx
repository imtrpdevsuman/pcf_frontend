import {
	DynamicPage,
	DynamicPageHeader,
	DynamicPageTitle,
	DatePicker,
} from "@ui5/webcomponents-react";
import RiskCard from "../components/RiskCard";
import cardData from "../lib/cardData";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import FilterBarComponent from "../components/FilterBarComponent";

const Home = () => {
	return (
		<DynamicPage
			headerContent={
				<DynamicPageHeader>
					<FilterBarComponent />
				</DynamicPageHeader>
			}
			headerTitle={
				<DynamicPageTitle
					actions={
						<>
							<DatePicker
								onChange={function _a() {}}
								onInput={function _a() {}}
								onValueStateChange={function _a() {}}
								primaryCalendarType="Gregorian"
								valueState="None"
								placeholder="Start Date"
							/>
							<DatePicker
								onChange={function _a() {}}
								onInput={function _a() {}}
								onValueStateChange={function _a() {}}
								primaryCalendarType="Gregorian"
								valueState="None"
								placeholder="End Date"
							/>
						</>
					}></DynamicPageTitle>
			}
			onPinnedStateChange={function _a() {}}
			onToggleHeaderContent={function _a() {}}
			style={{
				maxHeight: "7000px",
				borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
			}}
			showHideHeaderButton={false}
			headerContentPinnable={false}>
			{cardData.map((card, index) => {
				return (
					<RiskCard
						key={index}
						header={card.header}
						icon={card.icon}
						risk={card.risk}
						desciption={card.desciption}
					/>
				);
			})}
		</DynamicPage>
	);
};

export default Home;