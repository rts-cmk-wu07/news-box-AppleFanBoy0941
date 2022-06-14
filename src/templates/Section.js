import SectionHeader from '../components/SectionHeader';
import { useState, useContext } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { variables } from '../variables/variables';
import ThemeContext from '../context/ThemeContext';
import SectionArticle from '../components/SectionArticle';
import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
	Type as ListType,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation } from 'react-router-dom';
import PopUp from '../components/PopUp';

const Section = ({ title, data }) => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const [popUp, setPopUp] = useState('');
	const [popUpIsOpen, setPopUpIsOpen] = useState(false);

	const filterData = articles => {
		return articles.filter(article => article.section === title);
	};

	const [numberOfArticles, setNumberOfArticles] = useState(
		filterData(data).length
	);
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
			width: 7rem;
		`,
	};

	const swipeHandler = article => {
		const ls = localStorage.getItem('archive');
		const archive = JSON.parse(ls);

		if (location.pathname === '/archive') {
			const newArchive = archive.filter(
				item => item.title !== article.title && item.section !== article.section
			);
			localStorage.setItem('archive', JSON.stringify(newArchive));
			setNumberOfArticles(numberOfArticles - 1);
		} else {
			let isDuplicate;
			if (archive) {
				isDuplicate = archive.some(
					item =>
						item.title === article.title && item.section === article.section
				);
			} else {
				isDuplicate = false;
			}

			if (!isDuplicate) {
				const newArchive = {
					title: article.title,
					media: article.media,
					abstract: article.abstract,
					section: article.section,
					url: article.url,
				};
				console.log(newArchive);
				let updatedArchive = [];
				if (archive) {
					updatedArchive = [...archive, newArchive];
				} else {
					updatedArchive = [newArchive];
				}
				localStorage.setItem('archive', JSON.stringify(updatedArchive));
				setPopUpIsOpen(true);
				setPopUp('The article is saved. You can find it in the archive.');
				setTimeout(() => {
					setPopUpIsOpen(false);
				}, 5000);
			} else {
				console.log('duplicate');
				setPopUpIsOpen(true);
				setPopUp(`You have already saved this article`);
				setTimeout(() => {
					setPopUpIsOpen(false);
				}, 5000);
			}
		}
	};

	return (
		<section css={styles.section}>
			<SectionHeader
				title={title}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				numberOfArticles={numberOfArticles}
			/>
			<SwipeableList
				css={styles.list}
				fullSwipe={true}
				type={ListType.IOS}
				swipeStartThreshold={0.1}
				threshold={0.4}
			>
				{data &&
					filterData(data).map((article, index) => (
						<SwipeableListItem
							key={index}
							trailingActions={
								<TrailingActions>
									<SwipeAction
										onClick={() => swipeHandler(article)}
										destructive={location.pathname === '/archive'}
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
			<PopUp popUp={popUp} popUpIsOpen={popUpIsOpen} />
		</section>
	);
};

export default Section;
