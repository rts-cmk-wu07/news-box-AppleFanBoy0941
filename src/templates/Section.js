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
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Section = ({ title, data, updater, setPopUp, setPopUpIsOpen, id }) => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const filterData = articles => {
		return articles.filter(article => article.section === title);
	};

	let numberOfArticles = data.filter(
		article => article.section === title
	).length;

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
		div: css`
			background: ${v.text_3};
			transition: calc(0.05s * ${numberOfArticles} + 0.25s);
			${!isOpen &&
			`
				margin-top: -6rem;
				opacity: 0;
				transform: scale(.7);
				filter: blur(1rem);
			`}
		`,
		delete: css`
			background: ${v.primary_2};
			display: flex;
			align-items: center;
			justify-content: center;
			color: ${v.text_light};
			width: 7rem;
		`,
	};

	const swipeHandler = article => {
		const ls = localStorage.getItem('archive');
		const archive = JSON.parse(ls);

		if (location.pathname === '/archive') {
			setTimeout(() => {
				const newArchive = archive.filter(item => item.title !== article.title);
				localStorage.setItem('archive', JSON.stringify(newArchive));
				numberOfArticles--;
				updater(newArchive);
			}, 500);
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
				let updatedArchive = [];
				if (archive) {
					updatedArchive = [...archive, newArchive];
				} else {
					updatedArchive = [newArchive];
				}
				localStorage.setItem('archive', JSON.stringify(updatedArchive));
				toast.success('The article is saved. You can find it in the archive.', {
					position: 'top-center',
				});
			} else {
				toast.info('You have already saved this article');
			}
		}
	};

	return (
		<section css={styles.section} id={id}>
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
							css={styles.div}
							trailingActions={
								<TrailingActions>
									<SwipeAction onClick={() => swipeHandler(article)}>
										{location.pathname === '/home' ? (
											<div css={styles.action}>
												<FeatherIcon icon="inbox" />
											</div>
										) : (
											<div css={styles.delete}>
												<FeatherIcon icon="trash-2" />
											</div>
										)}
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
