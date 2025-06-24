INSERT INTO rantr_users (id, email, first_name, last_name, status, username)
VALUES
    ('d07aeaf4-4464-4ee8-8de3-627898211cd6', 'daniellejohnson@rantr.co.uk', 'Danielle', 'Johnson', 'COMPLETE', 'daniellejohnson770487'),
    ('ee70ffed-2079-4763-a3d9-b370853a8f01', 'joshuawalker@rantr.co.uk', 'Joshua', 'Walker', 'COMPLETE', 'joshuawalker216739'),
    ('01138b38-a7eb-493b-be18-00bfad6164b1', 'jillrhodes@rantr.co.uk', 'Jill', 'Rhodes', 'COMPLETE', 'jillrhodes126225'),
    ('c5c437b6-8162-425e-91a6-3dd5f4eabb9a', 'patriciamiller@rantr.co.uk', 'Patricia', 'Miller', 'COMPLETE', 'patriciamiller877572'),
    ('c3310d9b-6f55-4e9b-8781-8c2f2fccd898', 'robertjohnson@rantr.co.uk', 'Robert', 'Johnson', 'COMPLETE', 'robertjohnson388389'),
    ('fabf2432-5b0c-4e3a-a1bc-fd1b18373823', 'jefferywagner@rantr.co.uk', 'Jeffery', 'Wagner', 'COMPLETE', 'jefferywagner356787'),
    ('f2150dc7-36d4-41fb-a59c-cf47b81f6e43', 'anthonygonzalez@rantr.co.uk', 'Anthony', 'Gonzalez', 'COMPLETE', 'anthonygonzalez334053'),
    ('6b871c47-df2d-4bcc-b702-966bf0d158d8', 'debragardner@rantr.co.uk', 'Debra', 'Gardner', 'COMPLETE', 'debragardner246316'),
    ('daf5c3ef-f11f-4da7-8586-cc181cd8ccdf', 'jeffreylawrence@rantr.co.uk', 'Jeffrey', 'Lawrence', 'COMPLETE', 'jeffreylawrence872246'),
    ('c451aaf0-3253-4c33-9919-753e907eb284', 'lisasmith@rantr.co.uk', 'Lisa', 'Smith', 'COMPLETE', 'lisasmith207473'),
    ('2cec7157-3aef-4660-8c64-c59e7387995d', 'lindawolfe@rantr.co.uk', 'Linda', 'Wolfe', 'COMPLETE', 'lindawolfe809570'),
    ('b14a4c97-d639-4dd9-bd4b-9b12930a63bc', 'matthewmoore@rantr.co.uk', 'Matthew', 'Moore', 'COMPLETE', 'matthewmoore876646'),
    ('a2fdfda1-847d-4e50-b3e3-9226dd559e1e', 'susanrogers@rantr.co.uk', 'Susan', 'Rogers', 'COMPLETE', 'susanrogers671858'),
    ('60f95e26-64b8-4dde-98dc-083d5936e78c', 'christopherdavis@rantr.co.uk', 'Christopher', 'Davis', 'COMPLETE', 'christopherdavis191161'),
    ('5160ef05-0ea8-4fb0-b8d7-6c582e9a857a', 'melaniemunoz@rantr.co.uk', 'Melanie', 'Munoz', 'COMPLETE', 'melaniemunoz719176'),
    ('1395c094-85ec-44e1-9658-9a99d0970b9b', 'lindsayblair@rantr.co.uk', 'Lindsay', 'Blair', 'COMPLETE', 'lindsayblair542417'),
    ('24cbd4c4-92c4-4b72-a036-d6ed31fe5c0b', 'amandadudley@rantr.co.uk', 'Amanda', 'Dudley', 'COMPLETE', 'amandadudley133326'),
    ('51ad02bb-df67-464f-8d30-33fe47ddd93d', 'nicholasarnold@rantr.co.uk', 'Nicholas', 'Arnold', 'COMPLETE', 'nicholasarnold131244'),
    ('c88109f3-8960-4616-a434-05ff0b11d877', 'mariamontgomery@rantr.co.uk', 'Maria', 'Montgomery', 'COMPLETE', 'mariamontgomery198246'),
    ('3be98edc-ae6c-4dda-b9fb-ac26ebaf9321', 'michelleray@rantr.co.uk', 'Michelle', 'Ray', 'COMPLETE', 'michelleray329258');

INSERT INTO terms (id, user_id)
VALUES
    ('8a174ff9-58c1-4380-9e87-31a4f235d8a0', 'd07aeaf4-4464-4ee8-8de3-627898211cd6'),
    ('5621277a-ba08-4967-940e-401c431a1e6e', 'ee70ffed-2079-4763-a3d9-b370853a8f01'),
    ('be5e64b0-7e45-4a6d-85f5-ae6637ce253f', '01138b38-a7eb-493b-be18-00bfad6164b1'),
    ('02d69d7b-33df-4524-a29a-efb955d42a52', 'c5c437b6-8162-425e-91a6-3dd5f4eabb9a'),
    ('115bfab1-b3a5-4fb2-baad-0b5609b6d2dd', 'c3310d9b-6f55-4e9b-8781-8c2f2fccd898'),
    ('a9d92bd9-0c6b-40ed-a624-c7c92755a000', 'fabf2432-5b0c-4e3a-a1bc-fd1b18373823'),
    ('06610c9f-283f-481c-a545-62de3221f2da', 'f2150dc7-36d4-41fb-a59c-cf47b81f6e43'),
    ('28e9e137-d1b3-482c-83ae-8af970112b01', '6b871c47-df2d-4bcc-b702-966bf0d158d8'),
    ('db344e1a-3504-4a7c-a0b7-a834a41c2e0f', 'daf5c3ef-f11f-4da7-8586-cc181cd8ccdf'),
    ('78d6c575-5a33-4fe5-b261-9227b33be31b', 'c451aaf0-3253-4c33-9919-753e907eb284'),
    ('5acb1f6b-1700-4817-b7b9-0562e4e002ce', '2cec7157-3aef-4660-8c64-c59e7387995d'),
    ('be3698bb-9c0d-4b14-beb5-c22573b088c6', 'b14a4c97-d639-4dd9-bd4b-9b12930a63bc'),
    ('973bc082-bdf1-4435-9502-a49f0c7719c8', 'a2fdfda1-847d-4e50-b3e3-9226dd559e1e'),
    ('f54f4689-336a-4d01-9662-eda4ff90ec5f', '60f95e26-64b8-4dde-98dc-083d5936e78c'),
    ('ffbbd387-8e45-4a94-a988-5f6ee8c5b339', '5160ef05-0ea8-4fb0-b8d7-6c582e9a857a'),
    ('45952485-1be8-4471-be4a-8bf8a8a512cc', '1395c094-85ec-44e1-9658-9a99d0970b9b'),
    ('fc21e58f-f8df-4c77-9883-3de32c59e125', '24cbd4c4-92c4-4b72-a036-d6ed31fe5c0b'),
    ('7053e691-feef-4206-8780-94db90b2d8f7', '51ad02bb-df67-464f-8d30-33fe47ddd93d'),
    ('ead3aa1a-b4fb-40ab-94a3-285314a38ee7', 'c88109f3-8960-4616-a434-05ff0b11d877'),
    ('0a9ba726-137c-472b-aa3a-fcbff5cf0787', '3be98edc-ae6c-4dda-b9fb-ac26ebaf9321');

UPDATE rantr_users SET terms_id = '8a174ff9-58c1-4380-9e87-31a4f235d8a0' WHERE id = 'd07aeaf4-4464-4ee8-8de3-627898211cd6';
UPDATE rantr_users SET terms_id = '5621277a-ba08-4967-940e-401c431a1e6e' WHERE id = 'ee70ffed-2079-4763-a3d9-b370853a8f01';
UPDATE rantr_users SET terms_id = 'be5e64b0-7e45-4a6d-85f5-ae6637ce253f' WHERE id = '01138b38-a7eb-493b-be18-00bfad6164b1';
UPDATE rantr_users SET terms_id = '02d69d7b-33df-4524-a29a-efb955d42a52' WHERE id = 'c5c437b6-8162-425e-91a6-3dd5f4eabb9a';
UPDATE rantr_users SET terms_id = '115bfab1-b3a5-4fb2-baad-0b5609b6d2dd' WHERE id = 'c3310d9b-6f55-4e9b-8781-8c2f2fccd898';
UPDATE rantr_users SET terms_id = 'a9d92bd9-0c6b-40ed-a624-c7c92755a000' WHERE id = 'fabf2432-5b0c-4e3a-a1bc-fd1b18373823';
UPDATE rantr_users SET terms_id = '06610c9f-283f-481c-a545-62de3221f2da' WHERE id = 'f2150dc7-36d4-41fb-a59c-cf47b81f6e43';
UPDATE rantr_users SET terms_id = '28e9e137-d1b3-482c-83ae-8af970112b01' WHERE id = '6b871c47-df2d-4bcc-b702-966bf0d158d8';
UPDATE rantr_users SET terms_id = 'db344e1a-3504-4a7c-a0b7-a834a41c2e0f' WHERE id = 'daf5c3ef-f11f-4da7-8586-cc181cd8ccdf';
UPDATE rantr_users SET terms_id = '78d6c575-5a33-4fe5-b261-9227b33be31b' WHERE id = 'c451aaf0-3253-4c33-9919-753e907eb284';
UPDATE rantr_users SET terms_id = '5acb1f6b-1700-4817-b7b9-0562e4e002ce' WHERE id = '2cec7157-3aef-4660-8c64-c59e7387995d';
UPDATE rantr_users SET terms_id = 'be3698bb-9c0d-4b14-beb5-c22573b088c6' WHERE id = 'b14a4c97-d639-4dd9-bd4b-9b12930a63bc';
UPDATE rantr_users SET terms_id = '973bc082-bdf1-4435-9502-a49f0c7719c8' WHERE id = 'a2fdfda1-847d-4e50-b3e3-9226dd559e1e';
UPDATE rantr_users SET terms_id = 'f54f4689-336a-4d01-9662-eda4ff90ec5f' WHERE id = '60f95e26-64b8-4dde-98dc-083d5936e78c';
UPDATE rantr_users SET terms_id = 'ffbbd387-8e45-4a94-a988-5f6ee8c5b339' WHERE id = '5160ef05-0ea8-4fb0-b8d7-6c582e9a857a';
UPDATE rantr_users SET terms_id = '45952485-1be8-4471-be4a-8bf8a8a512cc' WHERE id = '1395c094-85ec-44e1-9658-9a99d0970b9b';
UPDATE rantr_users SET terms_id = 'fc21e58f-f8df-4c77-9883-3de32c59e125' WHERE id = '24cbd4c4-92c4-4b72-a036-d6ed31fe5c0b';
UPDATE rantr_users SET terms_id = '7053e691-feef-4206-8780-94db90b2d8f7' WHERE id = '51ad02bb-df67-464f-8d30-33fe47ddd93d';
UPDATE rantr_users SET terms_id = 'ead3aa1a-b4fb-40ab-94a3-285314a38ee7' WHERE id = 'c88109f3-8960-4616-a434-05ff0b11d877';
UPDATE rantr_users SET terms_id = '0a9ba726-137c-472b-aa3a-fcbff5cf0787' WHERE id = '3be98edc-ae6c-4dda-b9fb-ac26ebaf9321';

INSERT INTO posts (id, title, content, user_id, up_votes, down_votes, deleted, created_at) VALUES
    ('aa65a554-08bc-4306-bb90-fda79c1feffe', 'Foot pull financial could.', 'However career against close. Class wall recent behind system join. Daughter able clear understand.', 'daf5c3ef-f11f-4da7-8586-cc181cd8ccdf', DEFAULT, DEFAULT, DEFAULT, now()),
    ('4708e2ab-341e-4e51-bd67-d9dae8542576', 'Event mean full rule.', 'Clear admit page two matter recent bank. Piece campaign everyone believe likely measure. Strategy seek physical production step. Campaign station nor clear.', 'c3310d9b-6f55-4e9b-8781-8c2f2fccd898', DEFAULT, DEFAULT, DEFAULT, now()),
    ('d5a372bc-ac7f-4dee-9698-eef36f0f8f3a', 'Rest environmental must report.', 'Film forget figure song my since local. In style teacher identify data. Sense tax plan far.', 'd07aeaf4-4464-4ee8-8de3-627898211cd6', DEFAULT, DEFAULT, DEFAULT, now()),
    ('20891bb8-8a14-41cd-9ed1-6e12d04c7de0', 'Policy stock sport rock.', 'Hope business item tonight offer successful. Land rather concern throughout serious.', '6b871c47-df2d-4bcc-b702-966bf0d158d8', DEFAULT, DEFAULT, DEFAULT, now()),
    ('5c76ee61-e06d-41bf-9b4b-e16c42b771e5', 'Civil phone too.', 'Physical few four might. Final work huge poor right city Mr.', '5160ef05-0ea8-4fb0-b8d7-6c582e9a857a', DEFAULT, DEFAULT, DEFAULT, now()),
    ('4f04db41-9307-4e34-b8ef-83c4899c2f4d', 'Gun someone wish yet.', 'Message clear leg. Check politics require parent political.', '60f95e26-64b8-4dde-98dc-083d5936e78c', DEFAULT, DEFAULT, DEFAULT, now()),
    ('ab627d3a-daf5-44c6-9374-818c740c6a95', 'Property card dog tree.', 'Impact best gas front environmental state. Green parent meet scene. Money later treat condition.', 'c5c437b6-8162-425e-91a6-3dd5f4eabb9a', DEFAULT, DEFAULT, DEFAULT, now()),
    ('cbf54d95-d999-443e-946a-5d6c5ae1c019', 'Sign generation nearly direction.', 'Surface make student fund. Treat pretty north building everything.', '01138b38-a7eb-493b-be18-00bfad6164b1', DEFAULT, DEFAULT, DEFAULT, now()),
    ('113df994-07c5-4329-8235-e93b582e9902', 'East Democrat camera occur.', 'Indeed form real. Purpose sing radio line determine. Serve executive you.', 'fabf2432-5b0c-4e3a-a1bc-fd1b18373823', DEFAULT, DEFAULT, DEFAULT, now()),
    ('5ab103eb-2ef6-4c26-8586-f234d0b36efb', 'Operation nature inside.', 'Style girl company. Meeting dog generation else performance. Organization require yet vote detail. Skin option near plant range.', '24cbd4c4-92c4-4b72-a036-d6ed31fe5c0b', DEFAULT, DEFAULT, DEFAULT, now());

INSERT INTO post_images (id, post_id, image_url) VALUES
    ('f3646a0e-24b9-470f-84df-2e032dcf4714', 'aa65a554-08bc-4306-bb90-fda79c1feffe', 'https://source.unsplash.com/random/800x600?sig=0'),
    ('07df02b2-ff83-4d14-b6e7-35b616db6e95', '4708e2ab-341e-4e51-bd67-d9dae8542576', 'https://source.unsplash.com/random/800x600?sig=1'),
    ('3f8755b0-f1e1-4208-a6e7-f94d435793c1', 'd5a372bc-ac7f-4dee-9698-eef36f0f8f3a', 'https://source.unsplash.com/random/800x600?sig=2'),
    ('b0fc3e2d-5f55-4704-a46d-4ef917e40048', '20891bb8-8a14-41cd-9ed1-6e12d04c7de0', 'https://source.unsplash.com/random/800x600?sig=3'),
    ('254089de-85c1-405c-9252-59aeb13f1612', '5c76ee61-e06d-41bf-9b4b-e16c42b771e5', 'https://source.unsplash.com/random/800x600?sig=4'),
    ('06d1e389-e4b7-4422-bbfe-746c0d6ed59e', '4f04db41-9307-4e34-b8ef-83c4899c2f4d', 'https://source.unsplash.com/random/800x600?sig=5'),
    ('d2bdb038-8c9a-46a4-8b89-45b1035ebdf6', 'ab627d3a-daf5-44c6-9374-818c740c6a95', 'https://source.unsplash.com/random/800x600?sig=6'),
    ('2d4db9fc-3999-44d2-8032-2e31be7e0d8e', 'cbf54d95-d999-443e-946a-5d6c5ae1c019', 'https://source.unsplash.com/random/800x600?sig=7'),
    ('5a9986b2-4105-45db-9bc5-188d07006ea5', '113df994-07c5-4329-8235-e93b582e9902', 'https://source.unsplash.com/random/800x600?sig=8'),
    ('c7ef384b-bd7a-4fe2-b065-e887becc2851', '5ab103eb-2ef6-4c26-8586-f234d0b36efb', 'https://source.unsplash.com/random/800x600?sig=9');

INSERT INTO comments (id, comment, user_id, up_votes, down_votes, original_comment, deleted, edited, created_at, post_id) VALUES
    ('46115742-8f80-45f3-a656-0b6b3e274b38', 'Move each left establish.', 'd07aeaf4-4464-4ee8-8de3-627898211cd6', DEFAULT, DEFAULT, NULL, DEFAULT, DEFAULT, now(), 'aa65a554-08bc-4306-bb90-fda79c1feffe'),
    ('018591a6-3cae-4271-9f13-e694b7020466', 'Detail food shoulder argue start source husband.', 'c451aaf0-3253-4c33-9919-753e907eb284', DEFAULT, DEFAULT, NULL, DEFAULT, DEFAULT, now(), '4708e2ab-341e-4e51-bd67-d9dae8542576'),
    ('675fb8f9-e8bc-477e-9a87-ae6f9eeef2ac', 'Civil quite others his other life edge network.', '60f95e26-64b8-4dde-98dc-083d5936e78c', DEFAULT, DEFAULT, NULL, DEFAULT, DEFAULT, now(), 'd5a372bc-ac7f-4dee-9698-eef36f0f8f3a'),
    ('c34bc35f-087b-4ab0-90b8-3a3d1848301b', 'Quite boy those.', 'ee70ffed-2079-4763-a3d9-b370853a8f01', DEFAULT, DEFAULT, NULL, DEFAULT, DEFAULT, now(), '20891bb8-8a14-41cd-9ed1-6e12d04c7de0'),
    ('0c392b48-f021-4396-a3e1-3145971b54ed', 'Out major born.', 'f2150dc7-36d4-41fb-a59c-cf47b81f6e43', DEFAULT, DEFAULT, NULL, DEFAULT, DEFAULT, now(), '5c76ee61-e06d-41bf-9b4b-e16c42b771e5'),
    ('001f109d-f886-408a-b2ed-0346ccd80210', 'These story film around there water.', 'c88109f3-8960-4616-a434-05ff0b11d877', DEFAULT, DEFAULT, NULL, DEFAULT, DEFAULT, now(), '4f04db41-9307-4e34-b8ef-83c4899c2f4d'),
    ('c4c85277-ff6c-4efa-8e41-cfd5ff49d359', 'Detail audience piece director town teacher audience draw.', '2cec7157-3aef-4660-8c64-c59e7387995d', DEFAULT, DEFAULT, NULL, DEFAULT, DEFAULT, now(), 'ab627d3a-daf5-44c6-9374-818c740c6a95'),
    ('01da9802-22b6-4f0c-b92d-4d403fd1ee0a', 'Democrat car very number line six space.', 'daf5c3ef-f11f-4da7-8586-cc181cd8ccdf', DEFAULT, DEFAULT, NULL, DEFAULT, DEFAULT, now(), 'cbf54d95-d999-443e-946a-5d6c5ae1c019'),
    ('8bcdd8ed-1a45-431d-8155-08b8c4e40f39', 'Anything yourself structure why.', 'a2fdfda1-847d-4e50-b3e3-9226dd559e1e', DEFAULT, DEFAULT, NULL, DEFAULT, DEFAULT, now(), '113df994-07c5-4329-8235-e93b582e9902'),
    ('5a72029c-e166-4f59-b830-c7ebc309734b', 'Coach magazine degree husband around.', '3be98edc-ae6c-4dda-b9fb-ac26ebaf9321', DEFAULT, DEFAULT, NULL, DEFAULT, DEFAULT, now(), '5ab103eb-2ef6-4c26-8586-f234d0b36efb');

INSERT INTO post_interactions (post_id, user_id, direction, created_at) VALUES
    ('aa65a554-08bc-4306-bb90-fda79c1feffe', 'c88109f3-8960-4616-a434-05ff0b11d877', 'up', now()),
    ('4708e2ab-341e-4e51-bd67-d9dae8542576', '24cbd4c4-92c4-4b72-a036-d6ed31fe5c0b', 'up', now()),
    ('d5a372bc-ac7f-4dee-9698-eef36f0f8f3a', 'd07aeaf4-4464-4ee8-8de3-627898211cd6', 'up', now()),
    ('20891bb8-8a14-41cd-9ed1-6e12d04c7de0', '01138b38-a7eb-493b-be18-00bfad6164b1', 'down', now()),
    ('5c76ee61-e06d-41bf-9b4b-e16c42b771e5', '60f95e26-64b8-4dde-98dc-083d5936e78c', 'up', now()),
    ('4f04db41-9307-4e34-b8ef-83c4899c2f4d', '6b871c47-df2d-4bcc-b702-966bf0d158d8', 'down', now()),
    ('ab627d3a-daf5-44c6-9374-818c740c6a95', 'f2150dc7-36d4-41fb-a59c-cf47b81f6e43', 'down', now()),
    ('cbf54d95-d999-443e-946a-5d6c5ae1c019', 'fabf2432-5b0c-4e3a-a1bc-fd1b18373823', 'down', now()),
    ('113df994-07c5-4329-8235-e93b582e9902', 'ee70ffed-2079-4763-a3d9-b370853a8f01', 'down', now()),
    ('5ab103eb-2ef6-4c26-8586-f234d0b36efb', '60f95e26-64b8-4dde-98dc-083d5936e78c', 'down', now());


INSERT INTO comment_interactions (comment_id, user_id, direction, created_at) VALUES
    ('46115742-8f80-45f3-a656-0b6b3e274b38', 'daf5c3ef-f11f-4da7-8586-cc181cd8ccdf', 'up', now()),
    ('018591a6-3cae-4271-9f13-e694b7020466', 'c3310d9b-6f55-4e9b-8781-8c2f2fccd898', 'up', now()),
    ('675fb8f9-e8bc-477e-9a87-ae6f9eeef2ac', 'd07aeaf4-4464-4ee8-8de3-627898211cd6', 'up', now()),
    ('c34bc35f-087b-4ab0-90b8-3a3d1848301b', '6b871c47-df2d-4bcc-b702-966bf0d158d8', 'up', now()),
    ('0c392b48-f021-4396-a3e1-3145971b54ed', '5160ef05-0ea8-4fb0-b8d7-6c582e9a857a', 'up', now()),
    ('001f109d-f886-408a-b2ed-0346ccd80210', '5160ef05-0ea8-4fb0-b8d7-6c582e9a857a', 'down', now()),
    ('c4c85277-ff6c-4efa-8e41-cfd5ff49d359', 'c3310d9b-6f55-4e9b-8781-8c2f2fccd898', 'up', now()),
    ('01da9802-22b6-4f0c-b92d-4d403fd1ee0a', 'b14a4c97-d639-4dd9-bd4b-9b12930a63bc', 'up', now()),
    ('8bcdd8ed-1a45-431d-8155-08b8c4e40f39', 'daf5c3ef-f11f-4da7-8586-cc181cd8ccdf', 'up', now()),
    ('5a72029c-e166-4f59-b830-c7ebc309734b', '5160ef05-0ea8-4fb0-b8d7-6c582e9a857a', 'up', now());

UPDATE posts
    SET up_votes = COALESCE(ups.count, 0),
        down_votes = COALESCE(downs.count, 0)
    FROM (
        SELECT post_id, COUNT(*) AS count
        FROM post_interactions
        WHERE direction = 'up'
        GROUP BY post_id
    ) AS ups
    FULL OUTER JOIN (
        SELECT post_id, COUNT(*) AS count
        FROM post_interactions
        WHERE direction = 'down'
        GROUP BY post_id
    ) AS downs ON ups.post_id = downs.post_id
    WHERE posts.id = COALESCE(ups.post_id, downs.post_id);

UPDATE comments
    SET up_votes = COALESCE(ups.count, 0),
        down_votes = COALESCE(downs.count, 0)
    FROM (
        SELECT comment_id, COUNT(*) AS count
        FROM comment_interactions
        WHERE direction = 'up'
        GROUP BY comment_id
    ) AS ups
    FULL OUTER JOIN (
        SELECT comment_id, COUNT(*) AS count
        FROM comment_interactions
        WHERE direction = 'down'
        GROUP BY comment_id
    ) AS downs ON ups.comment_id = downs.comment_id
    WHERE comments.id = COALESCE(ups.comment_id, downs.comment_id);












