import SectionHeader from '../components/SectionHeader';
import { useState, useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { variables } from '../variables/variables';
import ThemeContext from '../context/ThemeContext';
import SectionArticle from '../components/SectionArticle';
import {
	LeadingActions,
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import FeatherIcon from 'feather-icons-react';

const Section = ({ title, data }) => {
	const [isOpen, setIsOpen] = useState(false);

	const filterData = articles => {
		return articles.filter(article => article.section === title);
	};

	const numberOfArticles = filterData(data).length;
	const articleHeight = 6;

	const context = useContext(ThemeContext);
	const theme = context.theme;
	let v;
	if (theme === 'dark') {
		v = variables.dark;
	} else {
		v = variables.light;
	}
	const styles = {
		section: css`
			border-bottom: 2px solid ${v.secondary_1};
		`,
		list: css`
			height: 0;
			overflow-y: hidden;
			transition: calc(0.05s * ${numberOfArticles} + 0.25s);

			${isOpen &&
			`
				height: calc(${
					numberOfArticles * articleHeight
				}rem + (${numberOfArticles} * 1px));
			`}
		`,
		action: css`
			display: flex;
			align-items: center;
			justify-content: center;
			background: ${v.primary_1};
			color: ${v.text_light};
		`,
	};

	return (
		<section css={styles.section}>
			<SectionHeader title={title} isOpen={isOpen} setIsOpen={setIsOpen} />
			<SwipeableList css={styles.list}>
				{data &&
					filterData(data).map((article, index) => (
						<SwipeableListItem
							key={index}
							trailingActions={
								<TrailingActions>
									<SwipeAction
										onClick={() => console.log('This is now archived')}
									>
										<div css={styles.action}>
											<FeatherIcon icon="inbox" />
										</div>
									</SwipeAction>
								</TrailingActions>
							}
						>
							<SectionArticle data={article} />
						</SwipeableListItem>
					))}
			</SwipeableList>
		</section>
	);
};

export default Section;
